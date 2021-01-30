import { memo, useState, useRef, useEffect } from "react"
import ShowModal from '../../../../../components/showModal'
import ConfigMain from "./ConfigMain"
import { SettingOutlined, ExpandOutlined, RetweetOutlined } from '@ant-design/icons'
import { Tooltip, Modal } from 'antd'
import { useConfirm } from "../../../../../utils/hooks"

const {confirm} = Modal

const ConfigBar = () => {
  const open = useRef<(...args: any) => any>(null)
  const confirm = useConfirm()
  const resetCode = () => {
    confirm()
  }
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

export default memo(ConfigBar)