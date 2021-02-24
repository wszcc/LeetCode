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
          </div>
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

export default connect(mapState, mapDispatch)(Desc);
