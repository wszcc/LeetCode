import React from 'react'
import { Menu } from 'antd';
import '../indexNav/indexNav.css'
import {difficulty,status} from '../../router/config'
import { Link,HashRouter as Router } from "react-router-dom";
import Search from '../search/index'

const { SubMenu } = Menu;
class Sider extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

   
  render() {
    return (
        <Router>   <div>
           
        <div id='navWrap'>
          
          <div id= "search">
            <Search/>
          </div>
        
      <Menu
        onClick={this.handleClick}
        style={{ width: 100 }}
        mode="horizontal"
      >
        <SubMenu key='sub1' title='难度' id="sub_one">
            {
                difficulty.map((item,index)=>{
                    return <Menu.Item key={index}><Link to={item.to}>{item.name}</Link></Menu.Item>
                })
            }
        </SubMenu>
        </Menu>
      
        <Menu
        onClick={this.handleClick}
        style={{ width: 100 }}
        mode="horizontal"
      >
         <SubMenu key='sub2' title='状态'>
            {
                status.map((item,index)=>{
                    return <Menu.Item key={index}><Link to={item.to}>{item.name}</Link></Menu.Item>
                })
            }
        </SubMenu>
        </Menu>
        </div>
        <div id="list_introduction">
          <div id="intro_title">题名</div>
          <div id="intro_answer">题解</div>
          <div id="intro_passrate">通过率</div>
          <div id="intro_difficulty">难度</div>
          <div id="intro_status">状态</div>
        </div>
      
      </div>
     
      </Router>
    );
  }
}

export default Sider;
