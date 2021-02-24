import { FC, memo, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import SolutionList from "./SolutionList";
import Footer from "./Footer";
import Header from "./Header";
import "./style.scss";
import { fetchingSolution } from "../store";

interface Props {
  dispatch: Dispatch;
}

const SolutionLeft: FC<Props> = ({ dispatch }) => {
  useEffect(() => {
    dispatch(fetchingSolution(1));
  }, [dispatch]);
  return (
    <div className="solution-left">
      <Header />
      <SolutionList />
      <Footer />
    </div>
  );
};

export default connect()(memo(SolutionLeft));
