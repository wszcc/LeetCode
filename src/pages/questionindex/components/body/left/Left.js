import { Tabs } from "antd";
import { useEffect, useState } from 'react'
import Desc from './desc/Desc'
import SubmitRecord from "./submitrecord/SubmitRecord";
import Comment from './components/comment'
import SolutionLeft from "../solution/solution-left";
import { connect } from "react-redux";
import './style.scss'
const { TabPane } = Tabs;

const Left = (props) => {
  const { width } = props
  const [key, setActiveKey] = useState(props.activeKey)
  function callback(key) {
    setActiveKey(key)
  }
  useEffect(() => {
    setActiveKey(props.activeKey)
  },[props.activeKey])
  return (
    <div className="left" style={{
      width: width ? Math.max(width, 300) + "px" : "49.5vw"
    }}>
      <div className="left" style={{
        width: width ? Math.max(width, 300) + "px" : "49.5vw"
      }}>
        <Tabs 
        activeKey={key}
         onChange={callback} type="card">
          <TabPane tab="题目描述" key="1">
            <Desc />
          </TabPane>
          <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论" key="2">
            <Comment />
          </TabPane>
          <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题解" key="3">
            <SolutionLeft />
        </TabPane>
          <TabPane tab="提交记录" key="4">
            <SubmitRecord />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    activeKey:state.desc.activeKey,
  }
}

export default connect(mapState)(Left);
