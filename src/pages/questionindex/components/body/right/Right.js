import React,{useEffect} from 'react'
import E from 'wangeditor'
import CodeEditor from '../../code-editor'

const Right = (props) =>{
    useEffect(()=>{
        // const editor = new E('#div1')
        // editor.create()
    },[])
    return <div className='left'>
        <div id='div1'>
          <CodeEditor/>
        </div>
    </div>
}

export default Right