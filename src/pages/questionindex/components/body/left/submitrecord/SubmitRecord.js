import { Table, Tag, Space } from "antd";
import { memo, useEffect, useState } from "react";
import { getCommit } from '../../../../../../apis/comments'
import { getKeys } from '../../../../../../utils/shared'
const columns = [
  {
    title: "提交时间",
    dataIndex: "commitTime",
    key: "commitTime",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "提交结果",
    dataIndex: "commitResult",
    key: "commitResult",
  },
  {
    title: "运行时间",
    dataIndex: "runtime",
    key: "runtime",
  },
  {
    title: "语言",
    dataIndex: "word",
    key: "java",
  },
];

const SubmitRecord = () => {
  const [commitList, setCommitList] = useState()
  useEffect(() =>{
    getCommit('josdnf')
    .then(res =>{
      setCommitList(getKeys(res.data.data.commitList))
      console.log(getKeys(res.data.data.commitList))
    })
  },[])
  return (
    <div className="submit-record">
      {
        commitList? <Table pagination={false} columns={columns} dataSource={commitList} /> :''
      }
    </div>
  );
};

export default memo(SubmitRecord);
