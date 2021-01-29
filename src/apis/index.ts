import axios from 'axios'
import { storage } from '../utils/shared'

type PendingQueue = ((...args: any) => void)[]

const BASE_URL = 'http://47.107.90.201:8080'

const CONNECT_LIMIT = 1 // 最大网络连接数
const TIMEOUT = 1000 * 10 //最大请求到期时间 10s

let retryNum = 0
const MAX_RETRY_NUM = 5

export enum ErrorCode {
  Token_Expire_Code = 430,
  RefreshToken_Expire_Code = 432,
  No_Token = 425,
  Abort = 16625,
  Connect_Fail = 16626,
  Succes = 200
}
let now = window.performance
  ? () => performance.now()
  : () => Date.now();
const Concurrent_Timing = 2

let lastModified = 0

/** 当前请求数 */
let requestNum = 0
let pendingQueue: PendingQueue = []
let isRefreshing = false

/** 不需要token的请求 */
const whiteList = new Set([
  '/user/resetToken',
  '/user/login',
  '/user/register',
  '/user/checkEmail',
  '/user/checkUserId',
  '/user/sendActiveMail',
  '/user/logout',
  '/user/findBackPassword',
  '/user/checkUserLegality',
  '/token',
])

const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

request.interceptors.request.use(
  async config => {
    if (!storage.get('token') && !whiteList.has(config.url!)) {
      config.cancelToken = new axios.CancelToken(c => c())
      return config
    }
    console.log('isRefreshing' + isRefreshing);
    console.log('requestNum' + requestNum);

    if (!config.headers.priority && (isRefreshing || requestNum >= CONNECT_LIMIT)) { //如果正在请求新的token，代表当前token是过期了的
      try {
        await block() //等待前面的请求完
      } catch (e) {//这里表示等待时间过长, 仍然取消请求
        config.cancelToken = new axios.CancelToken(c => c())
        return config
      }
    }
    requestNum++
    config.headers = {
      token: storage.get("token") || "",
      contentType: 'application/json;charset=utf-8',
    }
    config.data = {
      userId: storage.get('userId') || ''
    }
    return config
  }
)

request.interceptors.response.use(
  async res => {
    try {
      if (res.data.error_code === ErrorCode.Token_Expire_Code) {
        /**
         *  token过期有两种情况
         *  1.第一次过期, 重新请求token并且重新发送请求，将新的结果返回
         *  2.并发请求中，全部过期，但是刚才有一个请求已经检测到过期，
         *    于是已经重新获取token了，需要将这个请求重新发送
         *  两种情况的判定：通过最近一次刷新token的时间（lastModified）来确定
         */
        console.log(now() - lastModified > Concurrent_Timing);

        if (now() - lastModified > Concurrent_Timing) { //第一次过期
          try {
            console.log('refresh tk');
            await refreshToken() //这里也会发一个请求，因此请求数+1了，因此这个函数最后会让请求数-1
          } catch (e) { //连refreshToken也失效了，需要重新登陆了
            storage.clear()
            return e
          }
        }
        requestNum--
        //返回新的请求,舍弃之前的请求
        const newRes = await request.request(res.config)
        console.log(newRes);
        return newRes
      }
      return res
    } finally {
      requestNum--
      send()
    }
  },
  err => {
    /** 只有网络连接失败和取消请求（没有携带token）会走到这里 */
    try {
      if (axios.isCancel(err)) { //是被取消的请求
        if (!storage.get('token')) { //因为没有token取消的，需要重新登陆
          return {
            ...err,
            data: {
              message: "未登陆",
              error_code: ErrorCode.No_Token
            }
          }
        }
        return {
          ...err,
          data: {
            message: '请求取消',
            error_code: ErrorCode.Abort
          }
        }
      }
      /** 网络异常 */
      return {
        ...err,
        data: {
          message: "网络异常",
          error_code: ErrorCode.Connect_Fail
        }
      }
    } finally {
      requestNum--
      send()
    }
  }
)

request.interceptors.response.use(
  res => {
    if (res.data.error_code && res.data.error_code !== ErrorCode.Succes) {
      throw {
        message: res.data.message,
        data: res.data
      }
    }
    return res
  }
)

async function refreshToken() {
  try {
    isRefreshing = true
    const refreshToken = storage.get('refreshToken')
    const res = await request.post('/user/resetToken', {
      refreshToken
    }, {
      headers: {
        priority: 1 //刷新token是高权限请求可以不用阻塞直接插队
      }
    })
    if (!res.data.data && !res.data.data.token && !res.data.data.refreshToken) {
      console.log('refresh fail');
      throw {
        ...res,
        data: {
          error_code: ErrorCode.RefreshToken_Expire_Code
        }
      }
    }
    storage.set('token', res.data.data.token)
    storage.set('refreshToken', res.data.data.refreshToken)
  } catch (error) {  //如果refreshToken也过期, 清空过期期间的请求
    pendingQueue = []
    throw {
      ...error,
      data: {
        error_code: ErrorCode.RefreshToken_Expire_Code
      }
    }
  } finally {
    isRefreshing = false
    /** 这里也会发一个请求，因此请求数+1了，因此这个函数最后会让请求数-1 */
    requestNum--
    lastModified = now()
  }
}


function block() {
  return new Promise((resolve, reject) => {
    const timerId: number = window.setTimeout(() => {
      reject(undefined)
    }, TIMEOUT)
    pendingQueue.push(() => {
      clearTimeout(timerId)
      resolve(undefined)
    })
  })
}

function send() {
  if (pendingQueue.length) {
    const resolve = pendingQueue.shift()!
    resolve(undefined)
  }
}

export default request