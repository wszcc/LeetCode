import { memo } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import Common from "./components/Common";

const Comment = () => (
  <Provider store={store}>
    <Common />
  </Provider>
);

export default memo(Comment);