import React from 'react'
import { Statistic, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import QuestionInfo from './QuestionInfo'
import InfoDisplay from './InfoDisplay'
import './index.scss'


const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.baidu.com">过去一年</a>
      </Menu.Item> 
    </Menu>
  )


const Section = () => {
    return(
        <div>
            <a href="http://www.baidu.com" className="pro-exhibition">
                <QuestionInfo/>
                <div className="pro-achive">
                    <Statistic title="勋章成就" value={0} className="ant-statistic"/>
                    <div className="pro-medal">
                        <span>即将获得</span><br/>
                        <b>2月打卡勋章</b>
                    </div>
                </div> 
            </a>
            <div className="pro-submit">
                <div className="pro-annual">
                    <div className="pro-annual-years">过去一年内共提交<span> 0 </span>次</div>
                    <div className="pro-annual-last-year">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="http://www.baidu.com" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            过去一年 <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                <div className="pro-month-record"></div>
            </div>
            <InfoDisplay/>
        </div>
    )
}

export default Section