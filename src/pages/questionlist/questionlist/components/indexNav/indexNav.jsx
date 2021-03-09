import React from 'react'
import { Menu,Tabs } from 'antd';
import '../indexNav/indexNav.css'
import {difficulty,status,tags,lists} from '../../router/config'
import { Link,HashRouter as Router } from "react-router-dom";
import Search from '../search/index'
import {CaretDownOutlined} from '@ant-design/icons'

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
      
      <div id="Menu_one">
      <Menu
        onClick={this.handleClick}
        style={{ width: 100 }}
        style={{marginRight:20}}
        mode="horizontal"
        style={{backgroundColor:'rgba(247,247,247)'}}
      >
        <SubMenu key='sub1' title={<span>&nbsp;&nbsp;&nbsp;&nbsp;难度<span> <CaretDownOutlined /></span></span>} id="sub_one">
           {
                difficulty.map((item,index)=>{
                    return <Menu.Item key={index}>{item.name}</Menu.Item>
                })
            }
        </SubMenu>
          </Menu>
          </div>
      
        <div id="Menu_two">
        <Menu
        onClick={this.handleClick}
        style={{ width: 50 }}
        mode="horizontal"
        style={{backgroundColor:'rgba(247,247,247)'}}
      >
         <SubMenu key='sub2' title={<span>&nbsp;&nbsp;&nbsp;&nbsp;状态<span> <CaretDownOutlined /></span></span>}>
            {
                status.map((item,index)=>{
                    return <Menu.Item key={index}>{item.name}</Menu.Item>
                })
            }
        </SubMenu>
        </Menu>
        </div>

        <div id="Menu_three">
      <Menu
        onClick={this.handleClick}
        style={{ width: 50 }}
        style={{marginRight:10}}
        mode="horizontal"
        style={{backgroundColor:'rgba(247,247,247)'}}
      >
        <SubMenu key='sub3' title={<span>&nbsp;&nbsp;&nbsp;&nbsp;列表<span> <CaretDownOutlined /></span></span>} id="sub_one">
           {
                lists.map((item,index)=>{
                    return <Menu.Item key={index}>{item.name}</Menu.Item>
                })
            }
        </SubMenu>
          </Menu>
          </div>

          <div id="Menu_four">
      <Menu
        onClick={this.handleClick}
        style={{ width: 60 }}
        style={{marginRight:20}}
        mode="horizontal"
        style={{backgroundColor:'rgba(247,247,247)'}}
      >
        <SubMenu key='sub4' title={<span>&nbsp;&nbsp;&nbsp;&nbsp;标签<span> <CaretDownOutlined /></span></span>} id="sub_one">
           {
                tags.map((item,index)=>{
                    return <Menu.Item key={index}>{item.name}</Menu.Item>
                })
            }
        </SubMenu>
          </Menu>
          </div>
        
        </div>
        
        <div id="list_introduction">
          <div id="intro_title">题名</div>
          <div id="intro_answer">题解</div>
          <div id="intro_passrate">通过率</div>
          <div id="intro_difficulty">难度</div>
          {/* <div id="intro_status">状态</div> */}
        </div>
      
      </div>
     
      </Router>
    );
  }
}

export default Sider;
