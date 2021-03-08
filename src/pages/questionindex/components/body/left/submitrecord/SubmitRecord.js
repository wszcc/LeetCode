import { Table, } from "antd";
import { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
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

const SubmitRecord = (props) => {
  const [commitList, setCommitList] = useState()
  useEffect(() =>{
    getCommit('josdnf')
    .then(res =>{
      setCommitList(getKeys(res.data.data.commitList))
    })
  },[])
  return (
    <div className="submit-record">
      {
        props.exeCodeRes.result?<ul className='result-info'>
        <li>执行结果 <span >{props.exeCodeRes.result == 'pass' ? '通过' : '解答错误'}</span></li>
        <li>执行时间 <span className="info">{props.exeCodeRes.runtime}</span></li>
        <li>击败对手 <span className="info">{props.exeCodeRes.runtimeBeat}</span></li>
        <li>内存消耗 <span className="info">{props.exeCodeRes.memory}</span></li>
    </ul>:null
      }
      {
        commitList? <Table pagination={false} columns={columns} dataSource={commitList} /> :''
      }
    </div>
  );
};

const mapState = (state) =>{
  return {
    exeCodeRes:state.desc.exeCodeRes
  }
}

export default connect(mapState)(memo(SubmitRecord));
