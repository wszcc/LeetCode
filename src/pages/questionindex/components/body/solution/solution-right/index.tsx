import { FC } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import "./style.scss";
import { dispatchShowDetail } from "../store";
import { wrapRequest } from "../../../../../../utils/hooks";
import {
  DetailInfo,
  fetchDetailSolution,
} from "../../../../../../apis/solution";
import { RootState } from "../../../../store";
import { Flags } from "../../../../../../utils/shared";
import { LoadingOutlined } from "@ant-design/icons";
import Comment from "../../left/components/comment";
import MdEditor from "../../left/components/mdEditor";

interface Props {
  dispatch: Dispatch;
  answerId: number;
}

const useGetDetail = wrapRequest(fetchDetailSolution);

const SolutionRight: FC<Props> = ({ dispatch, answerId }) => {
  const close = () => {
    dispatch(dispatchShowDetail(false));
  };
  const [data, flag] = useGetDetail(answerId);

  return (
    <div className="solution-right">
      <header className="flex a-center">
        <button className="close-btn" onClick={close}>
          关闭
        </button>
      </header>
      <div className="sr-content">
        {flag === Flags.Pending ? (
          <LoadingOutlined />
        ) : flag === Flags.Success ? (
          <Main {...data} />
        ) : (
          "网络异常"
        )}
      </div>
    </div>
  );
};

const Main: FC<DetailInfo> = (props) => (
  <div className="main">
    <div className="solution-header flex a-center">
      <img src={props.image} alt="头像" />
      <span>{props.userName}</span>
    </div>
    <div className="content">
      {props.content}
    </div>
    <MdEditor />
    <Comment parentId={props.answerId + ""} />
  </div>
);

export default connect((state: RootState) => ({
  answerId: state.solution.answerId,
}))(SolutionRight);
