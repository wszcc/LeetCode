import React, { useEffect } from 'react'
import Sider from './components/indexNav/indexNav'
import ListIndex from './components/list/list'
import Header from '../questionindex/components/header/Header'
import AnsweredInfo from '../questionlist/components/answeredInfo/index'
import '../questionlist/QuestionList.css'
import { useSelector } from 'react-redux'
import { useListData,useUserData } from './store/action'
import RandomStart from '../questionlist/components/randomStart/index'
import './index.css'


const IndexEasy = (props) =>{
    let {data,records,loading,userInfo} = useSelector(state=>state.list)
    console.log(useSelector(state=>state))
    let getData = useListData()
    let getUserData = useUserData()
    useEffect(()=>{
        getData()
        getUserData()
       },[])
    
    
    return  <div className='login' id='indexWrap'>
        <Header />
                <div id="infoWrap">
                    <AnsweredInfo 
                        userInfo={userInfo}
                    />
                    <RandomStart 
                        records={records}
                    />
                </div>
                
                <div id="siderWrap">
                    <Sider />
                </div>

                <ListIndex
                    records={records}
                    data={data}
                    loading={loading}
                />
            </div>
}

export default IndexEasy