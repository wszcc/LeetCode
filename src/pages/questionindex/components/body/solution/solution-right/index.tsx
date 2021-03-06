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
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";
import Comment from "../../left/components/comment";
import Avatar from "antd/lib/avatar/avatar";
import BraftEditor from "braft-editor";
import Loading from "../../../../../../components/loading";

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
          <div className="flex j-center a-center">
            <Loading size="large" />
          </div>
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
      <Avatar icon={<UserOutlined />} src={props.image} alt="头像" />
      <span>{props.userName}</span>
    </div>
    <BraftEditor
      value={BraftEditor.createEditorState(props.content)}
      controls={[]}
      readOnly={true}
    />
    <Comment />
  </div>
);

export default connect((state: RootState) => ({
  answerId: state.solution.answerId,
}))(SolutionRight);
