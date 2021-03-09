import React, { useState } from 'react'
import { Button,Card } from "antd";
import {Link} from 'react-router-dom'
import './index.css'
import {EditFilled} from '@ant-design/icons'
import { windowWhen } from 'rxjs/operators';
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from 'constants';

const RandomStart = (props) =>{
    
    
    return  (<div id="button_wrap">
        <Button>{<span>随机开始<span>&nbsp;<EditFilled /></span></span>}</Button>
    </div>
        
    )
}

export default RandomStart;
