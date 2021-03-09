
import { useDispatch } from 'react-redux'
import {storage} from '../../../../utils/shared'
import '../../mock/index'
import axios from "axios"
import request from '../../../../apis';

//获取主题列表数据
function useListData(){
    let dispatch = useDispatch();
    const token = storage.get('token')
    // console.log(token)
    dispatch({
        type:"list_loading",
        data:{},
        records:{},
        loading:true
    })
    return function(){
        let params = {}
        request.post('question/question/all', params)
        
        .then(value=>{
            dispatch({
                type:"list_loadover",
                data:value.data,
                records:value.data.records,
                loading:false
            })
        })
        
        .catch(err=>{
            console.log(err);
        }) 
    }
}
       
function useUserData(){
    let dispatch = useDispatch();
    const token = storage.get('token')
   
    return function(){
        axios.get('question/get-tag')
        
        .then(value=>{
            dispatch({
                type:"userInfo_loadover",
                userInfo:value
            })
        })
        
        .catch(err=>{
            console.log(err);
        }) 
    }
}

export {useListData,useUserData}

