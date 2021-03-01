import React,{ FC, useEffect, useRef, useState } from 'react'
import './style.scss'
import { exeCode, submitCode } from '../../../../apis/comments'
import { message } from 'antd'
import { BarsOutlined, SwapOutlined, LeftOutlined, RightOutlined, CaretRightOutlined, } from '@ant-design/icons'
import { connect } from 'react-redux'
interface CodeRes {
    "state": string,
    "input": string,
    "output": string,
    "exceptResult": string
}

interface Props {
    code:string
}

const Footer: FC<Props> = (props) => {
    const codeResult = useRef<null | HTMLDivElement>(null)
    const [codeRes, setCodeRes] = useState<CodeRes | ''>('')
    async function handleExeCode() {
        const res = await exeCode('questionId', props.code, 'testCode')
        if (res.data.code === 200) {
            setCodeRes(res.data.data)
            codeResult.current!.style.display = 'block'
        } else {
            message.error('网络错误！')
        }
    }
    function handleCloseExeCode() {
        codeResult.current!.style.display = 'none'
    }
    useEffect(() =>{
        console.log(props.code)
    })

    async function handleCodeSubmit () {
        const res = await submitCode ('jiosdnf',props.code)
        console.log(res)
        if(res.data.code === 200){
            message.success('提交成功')
        }else{
            message.error('提交失败')
        }    
    }
    return (
        <>
            <ul className='exe-code-box'>
                <li><BarsOutlined />题目列表</li>
                <li><SwapOutlined />随机一题</li>
                <li className='before'><LeftOutlined />上一题</li>
                <li className='totalnumber'>1/1982</li>
                <li>下一题<RightOutlined /></li>
                <li>控制台</li>
                <li>贡献</li>
                <li onClick={handleExeCode} className='execode'><CaretRightOutlined />执行代码</li>
                <li onClick={handleCodeSubmit} className='submit'>提交</li>
            </ul>
            <div ref={codeResult} className='code-result'>
                <span className='header'>
                    执行结果
                <span onClick={handleCloseExeCode} className='close'>X</span>
                </span>
                {
                    codeRes?<ul className='result-info'>
                    <li>状态 <span >{codeRes.state}</span></li>
                    <li>输入 <span className="info">{codeRes.input}</span></li>
                    <li>输出 <span className="info">{codeRes.output}</span></li>
                    <li>结果 <span className="info">{codeRes.exceptResult}</span></li>
                </ul>:''
                }
            </div>
        </>

    )
}
const mapState = (state:any) => {
    return {
        code:state.editorConfig.code
    }
}
export default connect(mapState)(Footer)