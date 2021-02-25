import { memo } from "react";
import Editor from "./components/Editor";
import ConfigBar from "./components/ConfigBar";
import "./style.scss";

const CodeEditor = () => {
  return (
    <>
      <ConfigBar />
      <Editor />
    </>
  );
};

export default memo(CodeEditor);
