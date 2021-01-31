import produce, { Immutable } from "immer"
import { useState } from "react"
import { LooseObj } from "../shared"
import { Modal } from 'antd'
import { Main_Light } from "../../config/colors"
interface Update<T> {
  (updateFn: (draft: Immutable<T>) => void): void
}

export const useImmer = <T extends LooseObj>(initState: T): [T, Update<T>] => {
  const [state, setState] = useState<T>(initState)

  const update: Update<T> = (updateFn) => {
    const newState = produce<T>(state, updateFn)
    setState(newState)
  }
  return [state, update]
}

export const useConfirm = (msg: string = "你确定吗", title: string = "确定？") => {
  const _okFn = () => { }
  const _cancelFn = () => { }

  return () => {
    Modal.confirm({
      title,
      content: msg,
      okText: "确定",
      cancelText: "取消",
      okButtonProps: {
        type: "text"
      }
    })
  }
}