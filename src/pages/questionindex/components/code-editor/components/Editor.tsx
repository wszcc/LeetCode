import { FC, useEffect, useRef } from "react";
import { Dispatch } from "redux";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/addon/display/autorefresh";
import "codemirror/addon/comment/comment";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/keymap/vim";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/material.css";
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/selection/active-line";
import "codemirror/mode/xml/xml.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/comment/comment";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closebrackets.js"; //自动括号
import { connect } from "react-redux";
import { actSaveCode } from "../store/actions";
import { RootState } from "../../../store";

interface Config {
  fontSize: number;
  theme: "dark" | "light";
  indent: number;
  code: string;
  dispatch: Dispatch;
}

const CodeEditor: FC<Config> = ({
  fontSize,
  theme,
  indent,
  code,
  dispatch,
}) => {
  const editor = useRef<CodeMirror>(null);

  useEffect(() => {
    const $editor = (editor.current as any).editor;
    $editor.setSize("100%", "100%");
  }, []);

  return (
    <CodeMirror
      className={"font-size-" + fontSize + " editor"}
      ref={editor}
      value={code}
      options={{
        mode: {
          name: "text/x-java",
        },
        theme: theme === "light" ? "eclipse" : "material",
        indentWithTabs: indent,
        tabSize: indent,
        lineNumbers: true,
        smartIndent: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        extraKyes: {
          Tab: "autocomplete",
        },
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      }}
      onBeforeChange={(...arr) => {
        dispatch(actSaveCode(arr[2]));
      }}
      onInputRead={(cm, change) => {
        cm.setOption("hintOptions", {
          completeSingle: false,
        });
        if (![";"].includes(change.text[0])) cm.execCommand("autocomplete");
      }}
    />
  );
};

export default connect((state: RootState) => ({
  ...state.editorConfig
}))(CodeEditor);
