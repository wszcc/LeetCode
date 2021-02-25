import axios from 'axios'
import { useDispatch } from 'react-redux'
import '../../mock/index'

//获取主题列表数据
function useListData(){
    let dispatch = useDispatch();
    return function(){
        dispatch({
            type:"list_loading"
        })
        axios.get('/question/list',{
            token:'23r2tqgasgaga',
            questionId:'lafjnfsldj'
          }).then((res) => {
            dispatch({
                type:'list_loadover',
                data:res.data.data
            })
           })
    }
}

export {useListData}