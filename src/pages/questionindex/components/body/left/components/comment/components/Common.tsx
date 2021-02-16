import { FC } from "react";
import { Dispatch } from "redux";
import { State } from "../store/reducer";
import { connect } from "react-redux";
import { actions } from "../store/actions";

interface P {
  flag: number;
  comments: { author: string; content: string }[];
  dispatch: Dispatch;
}

const Common: FC<P> = ({ dispatch, comments, flag }) => {
  const fetchData = () => dispatch(actions.fetchData());
  return (
    <>
      <button onClick={fetchData}>click</button>
      <div>
        {flag === 0
          ? "loading..."
          : flag === 1
          ? comments.map((val) => <div key={val.author}>{val.content}</div>)
          : "fail"}
      </div>
    </>
  );
};
export default connect((state: State) => ({
  comments: state.comment.comments,
  flag: state.comment.flag,
}))(Common);
