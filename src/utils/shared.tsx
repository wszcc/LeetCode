import { Modal } from "antd";
import { FC } from "react";

export interface LooseObj {
  [K: string]: any
}

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

export function debounce<T extends any[]>(fn: (...args: T) => any, ms: number = 1000) {
  let timer: number | null = null
  return (...args: T) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn(...args)
    }, ms)
  }
}
