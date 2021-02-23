import { memo } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Common from "./components/Common";

const Comment = () => (
  <Provider store={store}>
    <Common
      userName="fy"
      avatar=""
      content="hello world"
      likeNum={1234}
      replyNum={18}
      parentId={"1"}
      commentTime="2010/1/15"
      commentId={"d"}
      islike={0}
    />
  </Provider>
);

export default memo(Comment);
