import { Tabs } from "antd";
import Desc from './desc/Desc'
import SubmitRecord from "./submitrecord/SubmitRecord";
import Comment from './components/comment'
import SolutionLeft from "../solution/solution-left";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Left = (props) => {
  const { width } = props
  return (
    <div className="left" style={{
      width: width ? Math.max(width, 300) + "px" : "49.5vw"
    }}>
      <div className="left" style={{
        width: width ? Math.max(width, 300) + "px" : "49.5vw"
      }}>
        <Tabs onChange={callback} type="card">
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

export default Left;
