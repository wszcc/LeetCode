import produce, { Immutable } from "immer"
import { useCallback, useEffect, useState } from "react"
import { Flags, LooseObj } from "../shared"
import { message, Modal } from 'antd'
import { Main_Dark, Main_Light } from "../../config/colors"
import request, { ErrorCode, Response } from '../../apis'
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

interface IBtnStatus {
  children: string;
  btnProps: {
    loading: boolean,
    disabled: boolean
  }
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


export const useCaptcha = (
  type: 'email' | 'phone', 
  sendTarget: string, 
  initSeconds = 60, 
  deps: any[]
): [() => void, IBtnStatus] => {
  const [seconds, setSeconds] = useState(initSeconds);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCountDown, setIsCountDown] = useState(false);

  const [btnStatus, setBtnStatus] = useState<IBtnStatus>({
    children: '获取验证码',
    btnProps: {
      loading: false,
      disabled: true
    }
  });

  // 只有所有的 deps 全部有效后，captchaBtn 才能点击
  useEffect(() => {
    const res = deps.reduce((pre, current) => pre &= current, true);
    setIsDisabled(!res);
  }, deps)

  useEffect(() => {
    setBtnStatus({
      children: `${
        isLoading ? '发送中' : 
        isCountDown ? (seconds + ' 秒后可重发') : '获取验证码'
      }`,
      btnProps: {
        loading: isLoading,
        disabled: isDisabled
      }
    })
  }, [seconds, isLoading, isCountDown, isDisabled])


  let timer: any;

  useEffect(() => {
    return () => {
      clearInterval(timer)
    }
  });

  const startCountDown = () => {

    // 倒计时60秒
    // setSeconds(5);

    let countDownTime = initSeconds;
    // 每隔一秒，countDownTime 减 1
    timer = setInterval(() => {

      // countDownTime 为 0 时停止倒计时
      if (countDownTime <= 1) {
        setSeconds(initSeconds);
        setIsCountDown(false);
        setIsDisabled(false)
        clearInterval(timer);
        return;
      }
      countDownTime -= 1;
      setSeconds(countDownTime);
    }, 1000);
  }

  // 点击获取验证码
  const getCaptcha = () => {

    if (type === 'email') {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(sendTarget)) {
        if (sendTarget === '') {
          message.info('请输入邮箱');
        }
        return;
      }
    }
    // 按钮 loading：正在发送请求
    setIsLoading(true);
    setIsDisabled(true)

    request.post('/user/requestcode', {
      method: type,
      number: sendTarget
    }).then(reponse => {

      // 停止 loading
      setIsLoading(false);
      // 开始倒计时
      setIsCountDown(true);
      startCountDown();
      console.log(reponse);

    }).catch(reason => {
      console.log(reason);
    })
  }

  return [getCaptcha, btnStatus];
}