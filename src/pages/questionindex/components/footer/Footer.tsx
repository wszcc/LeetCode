import { FC, useEffect, useRef, useState } from 'react'
import './style.scss'
import { exeCode } from '../../../../apis/comments'
import { message } from 'antd'
import { BarsOutlined, SwapOutlined, LeftOutlined, RightOutlined, CaretRightOutlined, } from '@ant-design/icons'

interface CodeRes {
    "state": string,
    "input": string,
    "output": string,
    "exceptResult": string
}

const Footer: FC = () => {
    const codeResult = useRef<null | HTMLDivElement>(null)
    const [codeRes, setCodeRes] = useState<CodeRes | ''>('')
    async function handleExeCode() {
        const res = await exeCode('questionId', 'code', 'testCode')
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
    return (
        <>
            <ul className='exe-code'>
                <li><BarsOutlined />题目列表</li>
                <li><SwapOutlined />随机一题</li>
                <li className='before'><LeftOutlined />上一题</li>
                <li className='totalnumber'>1/1982</li>
                <li>下一题<RightOutlined /></li>
                <li>控制台</li>
                <li>贡献</li>
                <li onClick={handleExeCode} className='execode'><CaretRightOutlined />执行代码</li>
                <li className='submit'>提交</li>
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

export default Footer