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