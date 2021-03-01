import React from 'react'
import '../../mock/index'
import {List} from 'antd'
import "../list/list.css"

const onShowSizeChange= (current, pageSize) =>{
  console.log(current, pageSize);
}

const ListIndex = (props)=>{

    let {loading,data} =props
      return <List id="test"
        loading = {loading}
        dataSource = {data}
       
        pagination={{
          onShowSizeChange:{onShowSizeChange},
          defaultCurrent:1,
          total:500
        }}
        renderItem = {(data)=>{
          console.log(data)
        
          return <List.Item>
              <div id="item_message">
                <div id="data_title">{data.title} </div>
                <div id="data_message">
                    <div id="data_answer_num">{data.answer_num}</div>

                    <div id="data_passrate">{data.passrate}</div>

                    <div id="data_difficulty">{data.difficulty}</div>

                    <div id="data_status">{data.status}</div> 
                </div>
                
              </div>
            
          </List.Item>
         
          
        }}
      />
}

export default ListIndex;

