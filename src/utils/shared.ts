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