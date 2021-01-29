/**
 * 食用方式像这样：
 *    点击 设置  就会弹出传入的content
 *    如果需要在某些情况手动关闭，比如网络请求成功后关掉弹框:
 *                            * 传入 ref 
 *                            * myRef.current.close() 展示弹框
 *                            * myRef.current.open()  关闭弹框
 *     <ShowModal
 *       render={ <div>打开弹窗</div> }
 *       content={ <你的组件 /> }
 *       ref={myRef}
 *     />
 * 
 */
import { forwardRef, memo, ReactNode, useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'

interface Props {
  className?:string
  footer?: ReactNode
  onCancel?(): void
  show?: boolean
  switch?: boolean
  title?: string
  render: ReactNode
  content: ReactNode
  [K: string]: any
}

const ShowModal = forwardRef((props: Props, ref) => {
  const {
    footer,
    onCancel,
    content,
    render,
    show,
  } = props
  const [visible, setVisible] = useState(!!show)
  useImperativeHandle(ref, () => ({
    open: setVisible.bind(null, true),
    close: setVisible.bind(null, false),
  }), [ref, setVisible])

  const click = () => {
    setVisible(!visible)
  }
  const defaultOnChange = () => {
    setVisible(false)
  }

  return (
    <>
      <span onClick={click}>
        {render}
      </span>
      <Modal
        {...props}
        style={{ padding: "15px" }}
        visible={visible}
        footer={footer || null}
        maskClosable={true}
        onCancel={onCancel || defaultOnChange}
      >
        {content}
      </Modal>
    </>
  )
})

export default memo(ShowModal)