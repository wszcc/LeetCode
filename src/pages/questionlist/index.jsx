import React, { useEffect } from 'react'
import Sider from './components/indexNav/indexNav'
import ListIndex from './components/list/list'
import '../questionlist/QuestionList.css'
import { useSelector } from 'react-redux'
import { useListData } from './store/action'
import RandomStart from '../questionlist/components/randomStart/index'
import './index.css'


const Index = (props) =>{
    let {data,records,loading} = useSelector(state=>state.list)
    let getData = useListData()
    // let {scearch} = useLocation()
    // let {difficulty,status} = qs.parse(search.substr(1))
    useEffect(()=>{
        getData()
       },[])
    
    
    return  <div className='login' id='indexWrap'>
                <div id="button_start">
                    <RandomStart 
                        records={records}
                    />
                </div>
                
                <Sider />

                <ListIndex
                    records={records}
                    data={data}
                    loading={loading}
                />
            </div>
}

export default Index