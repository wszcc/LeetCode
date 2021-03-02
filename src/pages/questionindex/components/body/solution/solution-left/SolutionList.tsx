import { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SolutionList as List } from "../../../../../../apis/solution";
import { RootState } from "../../../../store";
import { EyeOutlined } from "@ant-design/icons";
import { dispatchShowDetail, switchId } from "../store";
import Loading from "../../../../../../components/loading";
import LikeBtn from "../../../../../../components/likeBtn";

interface Props {
  solutionList: readonly List[];
  dispatch: Dispatch;
  initial: boolean;
}

const SolutionList: FC<Props> = ({ solutionList, dispatch, initial }) => {
  const showDetail = (id: number) => {
    dispatch(switchId(id));
    dispatch(dispatchShowDetail(true));
  };
  return (
    <ul className="solution-list">
      {initial ? (
        solutionList.map((item) => (
          <Item {...item} key={item.answerId} onClick={showDetail} />
        ))
      ) : (
        <div className="flex j-center a-center">
          <Loading size="large" />
        </div>
      )}
    </ul>
  );
};

const Item: FC<{
  avatar: string | null;
  userName: string;
  title: string;
  summary: string;
  thumbup: number;
  view: string;
  answerId: string;
  islike: number;
  onClick: (id: number) => void;
}> = (item) => {
  const clickLikeBtn = () => {};

  return (
    <li className="item" onClick={item.onClick.bind(null, +item.answerId)}>
      <div className="item-header flex a-center">
        <img className="avatar" src={item.avatar!} alt={item.userName} />
        <span>{item.title}</span>
      </div>
      <div className="item-content">{item.summary}</div>
      <div className="item-footer flex a-center">
        <div className="flex a-center ic">
          <LikeBtn islike={item.islike} target="answer" targetId={item.answerId} />
          {item.thumbup}
        </div>
        <div className="flex a-center ic">
          <EyeOutlined />
          {item.view}
        </div>
      </div>
    </li>
  );
};

export default connect((state: RootState) => ({
  solutionList: state.solution.solutionList,
  initial: state.solution.initial,
}))(SolutionList);
