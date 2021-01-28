import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Left = (props) => {
  return (
    <div className="left">
      <Tabs onChange={callback} type="card">
        <TabPane  tab="题目描述" key="1">
          题目描述
        </TabPane>
        <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;评论" key="2">
        评论
        </TabPane>
        <TabPane tab="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题解" key="3">
          题解
        </TabPane>
        <TabPane tab="提交记录" key="4">
          提交记录
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Left;
