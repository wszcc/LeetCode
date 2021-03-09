import './index.css'
import { Statistic } from 'antd'

const AnsweredInfo = (props) =>{
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

    return (<div id='Info_wrap'>
        <div id='solved'>已解决{data.data.solved}/1900</div>
        <div id='diff'>困难{data.data.diff}</div>
        <div id='mid'>中等{data.data.mid}</div>
        <div id='easy'>简单{data.data.easy}</div>
        
        
    </div>)
}

export default AnsweredInfo;