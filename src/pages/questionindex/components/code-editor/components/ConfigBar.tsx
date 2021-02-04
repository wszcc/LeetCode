import { useRef, FC } from "react"
import ShowModal from '../../../../../components/showModal'
import ConfigMain from "./ConfigMain"
import { SettingOutlined, ExpandOutlined, RetweetOutlined } from '@ant-design/icons'
import { Tooltip, Modal } from 'antd'
import { useConfirm } from "../../../../../utils/hooks"
import { connect } from "react-redux"
import {Dispatch} from 'redux'
import { actSaveCode } from "../store/actions"
import { Default_Java_Code } from "../../../../../config/code"
interface P{
  dispatch: Dispatch
}

const ConfigBar: FC<P> = ({dispatch}) => {
  const open = useRef<(...args: any) => any>(null)
  const resetCode = useConfirm({
    onOk() {
      dispatch(actSaveCode(Default_Java_Code))
    }
  })

  return (
    <div className="head-bar flex j-between">
      <div>
        java
      </div>
      <div className="config-bar flex a-center">
        <div className="i-config" onClick={resetCode}>
          <Tooltip placement="bottom" title="重置为默认代码">
            <RetweetOutlined />
          </Tooltip>
        </div>
        <ShowModal
          className="editor-configer"
          title="代码编辑器设置"
          render={<div className="i-config">
            <Tooltip placement="bottom" title="代码编辑器设置">
              <SettingOutlined />
            </Tooltip>
          </div>}
          content={<ConfigMain />}
          ref={open}
        />
        <div className="i-config">
          <Tooltip placement="bottom" title="全屏">
            <ExpandOutlined />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default connect()(ConfigBar)