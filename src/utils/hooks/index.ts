import produce, { Immutable } from "immer"
import { useState } from "react"
import { LooseObj } from "../shared"
import { Modal } from 'antd'
import { Main_Dark, Main_Light } from "../../config/colors"
interface Update<T> {
  (updateFn: (draft: Immutable<T>) => void): void
}
interface IConfirm {
  msg?: string
  title?: string
  onOk?(): void
  onCancel?(): void
}

export const useImmer = <T extends LooseObj>(initState: T): [T, Update<T>] => {
  const [state, setState] = useState<T>(initState)

  const update: Update<T> = (updateFn) => {
    const newState = produce<T>(state, updateFn)
    setState(newState)
  }
  return [state, update]
}

export const useConfirm = ({
  msg = "你确定吗",
  title = "确定？",
  onOk,
  onCancel
}: IConfirm = {}) => {
  return () => {
    Modal.confirm({
      title,
      content: msg,
      okText: "确定",
      cancelText: "取消",
      onOk,
      onCancel,
      okButtonProps: {
        style: {
          background: Main_Light,
          color: "#fff"
        }
      },
      cancelButtonProps: {
        style: {
          color: Main_Dark
        }
      }
    })
  }
}