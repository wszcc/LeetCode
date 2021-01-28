import React,{useEffect} from 'react'
import E from 'wangeditor'

const Right = (props) =>{
    useEffect(()=>{
        const editor = new E('#div1')
        editor.create()
    },[])
    return <div className='left'>
        <div id='div1'></div>
    </div>
}

export default Right