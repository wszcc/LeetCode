import React from 'react'
import { Button,Card } from "antd";
import {Link} from 'react-router-dom'

const RandomStart = (props) =>{
    // let data = props.records
    // let randomItem = data[Math.floor(Math.random() * data.length)]

    return  (<div id="button_wrap">
        
        <Button><Link>随机开始</Link></Button>
        {/* //  to={`/questionindex/${randomItem.questionId}` */}
    </div>
        
    )
}

export default RandomStart;