import "braft-editor/dist/index.css";
import { forwardRef, useImperativeHandle, useState } from "react";
import BraftEditor from "braft-editor";
import "./style.scss";
import { Button } from "antd";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import "braft-extensions/dist/code-highlighter.css";
import "prismjs/components/prism-java";

BraftEditor.use(
  CodeHighlighter({
    syntaxs: [
      {
        name: "Java",
        syntax: "java",
      },
    ],
  })
);

interface Props {
  mentionId?: number;
  mentionName?: string;
  onSubmit?(): void;
}

const controlsMin = ["code", "link", "font-size"];

const MdEditor = forwardRef((props: Props, ref) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(
      props.mentionName ? `@${props.mentionName}&nbsp;` : ""
    )
  );

  const sendComment = props.onSubmit || (() => {});

  useImperativeHandle(ref, () => ({
    getContent() {
      return editorState.toHTML();
    },
  }));

  return (
    <div className="md-wrap">
      <BraftEditor
        id="editor-with-code-highlighter"
        className="md-editor min"
        onChange={setEditorState}
        value={editorState}
        controls={controlsMin as any}
      />
      <Button className="btn-comment" onClick={sendComment}>
        评论
      </Button>
    </div>
  );
});
export default MdEditor;
