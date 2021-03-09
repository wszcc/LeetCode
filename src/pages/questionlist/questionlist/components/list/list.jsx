import React, { useState } from 'react'
import {List} from 'antd'
import "../list/list.css"
import {Link} from 'react-router-dom'


const onShowSizeChange= (current, pageSize) =>{
  console.log(current, pageSize);
}


const ListIndex = (props)=>{

    let {records,data,loading} =props
      let total = data.size+50
      return <List id="list"
        dataSource = {records}
        loading={loading}
        pagination={{
          onShowSizeChange:{onShowSizeChange},
          defaultCurrent:1,
          total:total
        }}
        renderItem = {(records,index)=>{
          
          return (  <div>
            {
              (index%2 ==0) ?
          <List.Item
            style={{backgroundColor:"rgba(255,255,255)"}}
          >
            <div id="list_td">
              <div id="item_message">
                <div id="data_title" ><Link to= {`/questionindex/${records.questionId}`} style={{color:'rgba(59,134,198)'}}  >{records.title}</Link></div>
                
                <div id="data_message">
                    <div id="data_answer_num">{records.answerNum}</div>

                    <div id="data_passrate">{records.passRate}%</div>

                    <div id="data_difficulty">{records.difficulty}</div>
{/* 
                    <div id="data_status">hello</div>  */}
                </div>
                
              </div>
            </div>
            
          </List.Item>:
          <List.Item
          style={{backgroundColor:"rgba(250,250,250)"}}
        >
          <div id="list_td">
            <div id="item_message">
              <div id="data_title"><Link to= {`/questionindex/${records.questionId}` } style={{color:'rgba(59,134,198)'}}>{records.title}</Link></div>
              
              <div id="data_message">
                  <div id="data_answer_num">{records.answerNum}</div>

                  <div id="data_passrate">{records.passRate}%</div>

                  <div id="data_difficulty">{records.difficulty}</div>

                  {/* <div id="data_status">hello</div>  */}
              </div>
              
            </div>
          </div>
          
        </List.Item>}
        </div>

          )
         
         
          
        }}
      />

}

export default ListIndex;

