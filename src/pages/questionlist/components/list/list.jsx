import React from 'react'
import '../../mock/index'
import {List} from 'antd'
import "../list/list.css"
import {Link} from 'react-router-dom'

const onShowSizeChange= (current, pageSize) =>{
  console.log(current, pageSize);
}


const ListIndex = (props)=>{

    let {records,data,loading} =props
      return <List id="list"
        dataSource = {records}
        loading={loading}
        pagination={{
          onShowSizeChange:{onShowSizeChange},
          defaultCurrent:1,
          total:100
        }}
        renderItem = {(records)=>{
        
          return <List.Item>
              <div id="item_message">
                <div id="data_title"><Link to= {`/questionindex/${records.questionId}` }>{records.title}</Link></div>
                
                <div id="data_message">
                    <div id="data_answer_num">{records.answerNum}</div>

                    <div id="data_passrate">{records.passRate}</div>

                    <div id="data_difficulty">{records.difficulty}</div>

                    <div id="data_status">hello</div> 
                </div>
                
              </div>
            
          </List.Item>
         
         
          
        }}
      />
}

export default ListIndex;

