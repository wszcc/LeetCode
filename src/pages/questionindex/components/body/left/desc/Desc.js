import "./desc.scss";
import "../../../../../../mock/questionIndex.js";
import { getDescData, likeQuestion,  } from "../../../../../../apis/comments";
import DiffTag from "../components/dif-tag/DigTag";
import { devContetn } from "../../../../../../utils/shared";
import {
  likeAction,
  unLikeAction,
  collectAction,
  unCollectAction,
} from "../../../../store/actions";
import {
  LikeOutlined,
  HeartOutlined,
  RotateRightOutlined,
  SwapOutlined,
  BellOutlined,
  MessageOutlined,
  LikeFilled,
  HeartFilled,
} from "@ant-design/icons";
import { Fragment, useEffect, useState, memo } from "react";
import { connect } from "react-redux";
const Desc = (props) => {
  let [descData, setDescData] = useState({ code: 0 });
  let {
    like,
    dispatchLike,
    dispatchUnlike,
    collect,
    dispatchCollect,
    dispatchUnCollect,
  } = props;
  useEffect(() => {
    getDescData().then((res) => {
      setDescData(res.data);
    });
  }, [descData.code]);
  return (
    <div className="desc">
      {descData.code ? (
        <>
          <div className="title">1.{descData.data.title}</div>
          <ul className="tag">
            <li>
              难度 <DiffTag difficulty={descData.data.difficulty} />
            </li>
            <li>
              {like ? (
                <LikeFilled onClick={dispatchUnlike} />
              ) : (
                <LikeOutlined onClick={dispatchLike} />
              )}
              {descData.data.thumbup}
            </li>
            <li>
              {collect ? (
                <HeartFilled onClick={dispatchUnCollect} />
              ) : (
                <HeartOutlined onClick={dispatchCollect} />
              )}
              收藏
            </li>
            <li>
              <RotateRightOutlined /> 分享
            </li>
            <li>
              <SwapOutlined /> 切换为英文
            </li>
            <li>
              <BellOutlined /> 接收动态
            </li>
            <li>
              <MessageOutlined /> 反馈
            </li>
          </ul>
          <div className="content">
            {devContetn(descData.data.content).map((p, i) => (
              <Fragment key={i}>
                <p>{p} </p>
                <br />
              </Fragment>
            ))}
            <ul className='submit-number'>
              <li>通过次数 {descData.data.commit_num}</li>
              <li>提交次数 {descData.data.answe_num}</li>
            </ul>
          </div>
          <ul className='footer'>
            <li>在真实的面试中遇到过这道题？ <button>是</button> <button>否</button></li>
            <li>力扣(leetCode)版权所有</li>
            <li>相关企业</li>
            <li>相关标签</li>
            <li>相似题目</li>
            <li>显示提示1</li>
            <li>显示提示2</li>
            <li>显示提示3</li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    like: state.desc.like,
    collect: state.desc.collect,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatchLike() {
      const disLikeAction = likeAction();
      dispatch(disLikeAction);
      likeQuestion("question", true, "jsaodfnasd");
    },
    dispatchUnlike() {
      const disUnlikeAction = unLikeAction();
      dispatch(disUnlikeAction);
      likeQuestion("question", false, "jsaodfnasd");
    },
    dispatchCollect() {
      const disLikeAction = collectAction();
      dispatch(disLikeAction);
    },
    dispatchUnCollect() {
      const disUnlikeAction = unCollectAction();
      dispatch(disUnlikeAction);
    },
  };
};

export default memo(connect(mapState, mapDispatch)(Desc));
