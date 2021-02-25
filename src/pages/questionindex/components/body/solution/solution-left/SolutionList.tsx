import { FC } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SolutionList as List } from "../../../../../../apis/solution";
import { RootState } from "../../../../store";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { dispatchShowDetail, switchId } from "../store";

interface Props {
  solutionList: readonly List[];
  dispatch: Dispatch;
}

const SolutionList: FC<Props> = ({ solutionList, dispatch }) => {
  const showDetail = (id: number) => {
    dispatch(switchId(id));
    dispatch(dispatchShowDetail(true));
  };
  return (
    <ul className="solution-list">
      {solutionList.map((item) => (
        <Item {...item} key={item.answerId} onClick={showDetail} />
      ))}
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
  onClick: (id: number) => void;
}> = (item) => (
  <li className="item" onClick={item.onClick.bind(null, +item.answerId)}>
    <div className="item-header flex a-center">
      <img className="avatar" src={item.avatar!} alt={item.userName} />
      <span>{item.title}</span>
    </div>
    <div className="item-content">{item.summary}</div>
    <div className="item-footer flex a-center">
      <div className="flex a-center ic">
        <LikeOutlined className="s-like" />
        {item.thumbup}
      </div>
      <div className="flex a-center ic">
        <EyeOutlined />
        {item.view}
      </div>
    </div>
  </li>
);

export default connect((state: RootState) => ({
  solutionList: state.solution.solutionList,
}))(SolutionList);
