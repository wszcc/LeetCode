import axios from 'axios'
import { message } from 'antd'
import { storage } from '../utils/shared'

type PendingQueue = ((...args: any) => void)[]

const BASE_URL = 'http://localhost:3000/api'

const CONNECT_LIMIT = 6 // 最大网络连接数
const TIMEOUT = 1000 * 10 //最大请求到期时间 10s

export enum ErrorCode {
  Success = 200,
  BadRequest = 400, /**参数类型或者字段错误，只展示给我们开发者看，我会log到控制台 */
  UnAuthorized = 401,
  Abort = 520,
  Connect_Fail = 1314, /**由于用户网络断了等特殊情况导致的请求失败 */
}
const CodeMap = {
  [ErrorCode.Success]: "请求成功",
  [ErrorCode.UnAuthorized]: "请登陆",
  [ErrorCode.Connect_Fail]: "网络连接失败",
  [ErrorCode.BadRequest]: "参数异常",
  [ErrorCode.Abort]: "请求取消"
}
let now = window.performance
  ? () => performance.now()
  : () => Date.now();

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
  '/user/requestcode',
  '/user/logout',
  '/user/findBackPassword',
  '/user/checkUserLegality',
  '/token',
  '/course/queryCourse',
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

    if (!config.headers.priority && (isRefreshing || requestNum >= CONNECT_LIMIT)) { //如果正在请求新的token，代表当前token是过期了的
      try {
        await block() //等待前面的请求完
      } catch (e) {//这里表示等待时间过长, 仍然取消请求
        config.cancelToken = new axios.CancelToken(c => c())
        config.data.message = '超时'
        return config
      }
    }
    config.headers = {
      token: storage.get("token") || "",
      contentType: 'application/json;charset=utf-8',
    }
    return config
  },
  err => {
    console.log('异常未知情况造成的错误'); /**正常情况应该永远不会出现这里 */
    console.log(err);
  }
)

request.interceptors.response.use(
  async res => {
    try {
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
              message: "未登录",
              code: ErrorCode.UnAuthorized
            }
          }
        }
        return {
          data: {
            message: err.data.message,
            code: ErrorCode.Abort,
            data: err
          }
        }
      }
      /** 网络异常 或者 请求代码执行出错，可能是参数错误，
       *  比如onClick={func}, 把e传进了请求参数导致axiosJSON.stringify报错
       */
      return {
        data: {
          data: err,
          message: "网络异常",
          code: ErrorCode.Connect_Fail
        }
      }
    } finally {
      requestNum--
      send()
    }
  }
)

request.interceptors.response.use(
  (res: any) => {
    const code = res.data.code as ErrorCode

    switch (code) {
      case ErrorCode.Success: {
        const newTK = res.headers.token
        if (newTK && newTK !== res.config.headers.token) {
          storage.set("token", res.headers.token)
        }
        return res.data
      }
      default:
        message.info(CodeMap[code])
        return {
          code: code,
          message: res.data.message,
          data: res.data?.data
        }
    }
  }
)

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
  if (!isRefreshing && pendingQueue.length) {
    const resolve = pendingQueue.shift()!
    resolve()
  }
}

export default request

export interface Response<T = any> {
  code: number,
  message: string,
  data: T
}