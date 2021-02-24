import { Dropdown, Menu } from 'antd'
import { FC } from 'react'
import { connect } from 'react-redux'
import {  Dispatch } from 'redux'
import { RootState } from '../../../store'
import { actFontSize, actIndent, actTheme } from '../store/actions'
import { initState } from '../store/reducer'
import { DownOutlined } from '@ant-design/icons'

type State = typeof initState

interface Props extends State {
  dispatch: Dispatch
}

const configs: {
  keyword: string,
  title: string,
  description: string,
  options: Array<[string, string | number]>
}[] = [
    {
      keyword: "fontSize",
      title: "字体设置",
      description: "调整适合你的字体大小",
      options: [...Array(9).fill(["", 0])].map((v, i) => [12 + i + 'px', 12 + i]), //12-20px
    }, {
      keyword: "theme",
      title: "主题设置",
      description: "切换不同的编辑器主题",
      options: [["dark", "dark"], ["light", "light"]]
    }, {
      keyword: "indent",
      title: "Tab长度",
      description: "按下Tab后的缩进长度，默认为2",
      options: [["2", 2], ["4", 4]]
    }
  ]

const ConfigMain: FC<Props> = (props) => {
  return (
    <div className="config-main">
      {
        configs.map((v) => <EachConfig key={v.keyword} {...v} {...props} />)
      }
    </div>
  )
}

interface ConfigProps extends State {
  title: string,
  description: string,
  options: Array<[string, string | number]>,
  keyword: string,
  dispatch: Dispatch
}
const EachConfig: FC<ConfigProps> = (props) => {
  const { title, description, options, keyword, dispatch } = props
  return <div key={title} className="config-item flex j-between">
    <div style={{ width: '70%' }}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
    <div style={{ width: '30%' }}>
      <Dropdown
        overlay={
          <Menu>
            {
              options.map(([k, v]) => {
                const update = () => {
                  let action: any
                  switch (keyword) {
                    case "fontSize":
                      action = actFontSize(v as number)
                      break
                    case "theme":
                      action = actTheme(v as "dark" | "light")
                      break
                    case "indent":
                      action = actIndent(v as 2 | 4)
                      break
                  }
                  dispatch(action)
                }
                return <Menu.Item
                  key={k}
                  onClick={update}
                >
                  {k}
                </Menu.Item>
              })
            }
          </Menu>
        }
        trigger={['click']}
        placement="bottomCenter"
      >
        <div className="config-dropdown flex j-between a-center">
          <a href="/#">{props[keyword as "fontSize" | "theme" | "indent"]}</a>
          <DownOutlined />
        </div>
      </Dropdown>
    </div>
  </div>
}

export default connect(
  (state: RootState) => ({
    fontSize: state.editorConfig.fontSize,
    indent: state.editorConfig.indent,
    theme: state.editorConfig.theme,
    code: state.editorConfig.code
  })
)(ConfigMain)