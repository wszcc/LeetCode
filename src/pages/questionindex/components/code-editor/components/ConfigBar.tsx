import { memo, useState, useRef, useEffect } from "react"
import ShowModal from '../../../../../components/showModal'
import ConfigMain from "./ConfigMain"
import { SettingOutlined, ExpandOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'

const ConfigBar = () => {
  const open = useRef<(...args: any) => any>(null)

  return (
    <div className="head-bar flex j-between">
      <div></div>
      <div className="config-bar flex a-center">
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