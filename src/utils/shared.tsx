import { Modal } from "antd";
import { FC } from "react";

export interface LooseObj {
  [K: string]: any
}

export const storage = {
  get(key: string) {
    return localStorage.getItem(key)
  },
  set(key: string, obj: string | object) {
    if (!obj) {
      console.warn("存入失败，存入的不是对象或字符串类型")
      console.warn(obj);
      return
    }
    if (typeof obj === 'object') {
      obj = JSON.stringify(obj)
    }
    localStorage.setItem(key, obj)
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
