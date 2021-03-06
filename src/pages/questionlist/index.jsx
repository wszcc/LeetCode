import React, { useEffect } from 'react'
import Sider from './components/indexNav/indexNav'
import ListIndex from './components/list/list'
import '../questionlist/QuestionList.css'
import { useSelector } from 'react-redux'
import { useListData } from './store/action'
import './index.css'


const Index = (props) =>{
    let {data,loading} = useSelector(state=>state.list)
    let getData = useListData()
    // let {scearch} = useLocation()
    // let {difficulty,status} = qs.parse(search.substr(1))
    useEffect(()=>{
        getData()
       },[])
    return <div className='login' id='indexWrap'>
        <Sider />
        <ListIndex
            data={data}
            loading={loading}    
        />
        <div></div>
    </div>
}

export default Index