import React from 'react'
import {connect} from 'react-redux'
import { Statistic } from 'antd'
import Correct from './Correct'
import {proReqQuestion} from '../../../store/actions/proReqHistory_action'
import './index.scss'


const QuestionInfo = (props) => {
    var Mocks = require('mockjs')
    var data = Mocks.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'code|1-10': 1,
        'data': {
            "solved|1-1900": 1,
            'easy|1-549': 1,
            'mid|1-1014': 1,
            'diff|1-403':1
        }
    })
    

    return(
        <div className="pro-problem">
            <Statistic title="解决问题" value={data.data.solved} className="ant-statistic"/>
            <div className="pro-level">
                <div className="pro-easy">
                    <Statistic title="简单" value={data.data.easy} suffix="/100" />
                </div>
                <div className="pro-secondary">
                    <Statistic title="中等" value={data.data.mid} suffix="/100" />
                </div>
                <div className="pro-difficulty">
                    <Statistic title="困难" value={data.data.diff} suffix="/100" />
                </div>
            </div>
            <Correct/>
        </div>
    )
}

export default connect(
    qstate => ({data: qstate}),
    {
        getQuestionInfo: proReqQuestion
    }
)(QuestionInfo)