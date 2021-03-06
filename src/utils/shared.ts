export interface LooseObj {
  [K: string]: any
}
export interface LooseFn {
  (...args: any): any
}
export type NoUndef = number | string | Symbol | LooseFn | LooseFn | boolean

export const storage = {
  get(key: string) {
    return localStorage.getItem(key)
  },
  set(key: string, obj: string | number | object) {
    if (!obj) {
      console.warn("存入失败，存入的不是对象或字符串类型")
      console.warn(obj);
      return
    }
    if (typeof obj === 'object') {
      obj = JSON.stringify(obj)
    }
    localStorage.setItem(key, obj + "")
  },
  clear() {
    localStorage.clear()
  }
};

export function forEach(target: LooseObj, callback: (...args: any) => any) {
  if (!("length" in target)) {
    const keys = Object.keys(target)
    for (let i = 0; i < keys.length; i++) {
      callback(target[keys[i]])
    }
  }
  for (let i = 0; i < target.length; i++) {
    callback(target[i])
  }
}

export const Int = (str: string): number => {
  return parseInt(str)
}

export const Float = (str: string): number => {
  return parseFloat(str)
}

export function debounce<T extends any[]>(this: any, fn: (...args: T) => any, ms: number = 1000) {
  let timer: number | null = null
  const ctx = this
  return (...args: T) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn.apply(ctx, args)
    }, ms)
  }
}

export const delay = <T>(val: T, ms = 0): Promise<T> => new Promise(resolve =>
  setTimeout(resolve.bind(null, val), ms))

export const repeat = (fn: LooseFn, times = 1): void => {
  if (times < 0) return
  while (times--) {
    fn()
  }
}

export const repeatMap = <T>(fn: (i: number) => T, times = 0): T[] => {
  const res: T[] = new Array(times);
  let i = 0;
  while (i < times) {
    res[i] = fn(i)
    i++
  }
  return res
}


/**下面全是为了reducer中的类型推导 */
export const createAction = <T, P>(type: T, data: P = null as any) => ({type, data: data})

type Type<T> = { [K in keyof T]: K }
export function createTypes<T>(enumTypes: T, prefix = ""): Type<T> {
  return new Proxy(enumTypes as any, {
    get(target, key) {
      return prefix + target[key]
    }
  })
}

export type mapActions<Actions extends { [k: string]: () => any }> = ReturnType<Actions[keyof Actions]>

export enum Flags {
  Success = "success",
  Fail = "fail",
  Pending = "pending",
  Normal = "normal"
}

// 根据传入的时间获取多少时间前发布的
export function getTime(time: string): string {
  const minutes = 1000 * 60
  const hours = minutes * 60
  const days = hours * 24
  const months = days * 30
  const years = days * 365
  let res: string = '刚刚'
  let createTime = Date.parse(time)
  let nowTime = Date.parse((new Date()).toString())
  let subTime = nowTime - createTime
  let y = subTime / years
  let d = subTime / days
  let mon = subTime / months
  let h = subTime / hours
  let m = subTime / minutes
  const dateArr = [
    { time: y, des: '年之前' },
    { time: mon, des: '月之前' },
    { time: d, des: '天之前' },
    { time: h, des: '小时之前' },
    { time: m, des: '分钟之前' }
  ]
  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i].time > 1) {
      res = Math.round(dateArr[i].time) + dateArr[i].des
      break
    }
  }
  return res
}

type P = string[]

export const devContetn = (content: string): P => {
  const contentArr = content.split('。')
  const res = contentArr.map((i) => (i + '。'))
  return res
}

interface Item {
  "memory": string,
  "commitResult": string,
  "commitTime": string,
  "runtime": string,
  "key": string
}

type GetKeys<T extends Item> = (...arg: (T[])[]) => any

export const getKeys: GetKeys<Item> = (dataArr: (Item[])) => {
    dataArr.forEach((item:any, index) =>{
      item.key = index
      item.word = 'Java'
    })
  return dataArr
}