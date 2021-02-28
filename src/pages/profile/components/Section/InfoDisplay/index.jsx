import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd'
import {proReqHistory} from '../../../store/actions/proReqHistory_action'
import './index.scss'
import urlRecord from '../images/record.png'
import urlDiscuss from '../images/discuss.png'
import urlFollow from '../images/follow.png'
import urlDynamic from '../images/dynamic.png'

const { TabPane } = Tabs



const InfoDisply = (props) => {
    // 模拟数据
    var Mock = require('mockjs')
    var list = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'code': 200,
        'message':"ok",
        'data|20': [{
            "questionNum|1-1900": 1,
            'questionId|14332-682222': 1,
            'title|1': ["两数之和", "编辑距离", "三数之和"],
            'isPassed|1': [true, false]
        }]
    })

    useEffect(() => {
    })
    function reqRecord() {
        props.getHistoryData()  
    }
    return (
        <div className="pro-show-history">
                <div className="pro-card-container">
                    <Tabs type="card" onTabClick={reqRecord}>
                        <TabPane tab={<span>
                            <img src={urlRecord} alt=""/>
                            <span>  提交记录</span>
                        </span> } key="1" >
                            {list.data.map(value => {
                                return (
                                    <div className="pro-show" key={value.questionId}>
                                        <div className="left">
                                            <span>我在题目</span>
                                            <span className="same tixing">{value.questionNum}.{value.title}</span>
                                            <span className="same">中使用</span>
                                            <span className="same">java</span>
                                            <span className="same">进行了提交</span>
                                        </div>
                                        {
                                            value.isPassed ?
                                            <div className="right">
                                                <span className="pro-pass">通过</span>
                                                <span>2 天前</span>
                                            </div>:
                                            <div className="right">
                                                <span className="pro-error">编译出错</span>
                                                <span>2 天前</span>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                            
                        </TabPane>
                        <TabPane tab={<span>
                            <img src={urlDiscuss} alt=""/>
                            <span>  讨论发布</span>
                        </span>} key="2">
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                            <p>Content of Tab Pane 2</p>
                        </TabPane>
                        <TabPane tab={<span>
                            <img src={urlDynamic} alt=""/>
                            <span>  我的动态</span>
                        </span>} key="3">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </TabPane>
                        <TabPane tab={<span>
                            <img src={urlFollow} alt="" className="pro-img"/>
                            <span>  我的关注</span>
                        </span>} key="4">
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                            <p>Content of Tab Pane 3</p>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
    )
}

export default connect(
    state => ({list:state}),
    {
        getHistoryData: proReqHistory
    }
)(InfoDisply)