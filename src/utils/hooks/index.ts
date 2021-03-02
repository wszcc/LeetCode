import produce, { Immutable } from "immer"
import { useCallback, useEffect, useState } from "react"
import { Flags, LooseObj } from "../shared"
import { Modal } from 'antd'
import { Main_Dark, Main_Light } from "../../config/colors"
import { ErrorCode, Response } from '../../apis'
import { useParams } from "react-router"
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

export const wrapRequest = <T extends any[], R>(req: (...args: T) => Promise<Response<R>>) => {
  const useReqImpl = (...args: T): [Response<R>["data"], Flags, () => void] => {
    const [data, setData] = useState<Response["data"]>(null)
    const [flag, setFlag] = useState(Flags.Normal)

    const send = useCallback(async () => {
      setFlag(Flags.Pending)
      const res = await req(...args)
      if (res.code === ErrorCode.Success) {
        setFlag(Flags.Success)
      } else {
        setFlag(Flags.Fail)
      }
      setData(res.data)
    }, [...args])

    useEffect(() => {
      send()
    }, [send])

    return [data, flag, send]
  }
  return useReqImpl
}

export const useGetQuestionId = () => {
  const { questionId } = useParams<{
    questionId: string | undefined
  }>()
  return questionId
}