import "braft-editor/dist/index.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import BraftEditor, { BraftEditorProps } from "braft-editor";
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

interface Props extends BraftEditorProps{
  mentionId?: number;
  mentionName?: string;
  onSubmit?(): void;
  layout?: "up" | "down";
  visible?: boolean;
}

export interface EditorRef {
  getContent(): string;
  close(): void;
  getId(): number;
}

const controlsMin = ["code", "link", "font-size"];

const getOwnId = () => (Math.random() * 100000) << 0;

const MdEditor = forwardRef((props: Props, ref) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(
      props.mentionName ? `@${props.mentionName}&nbsp;` : ""
    )
  );
  const [id, setId] = useState(0);
  useEffect(() => {
    setId(getOwnId());
  }, []);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(props.visible === undefined ? true : props.visible);
  }, [props.visible]);

  const sendComment = props.onSubmit || (() => {});

  useImperativeHandle(
    ref,
    (): EditorRef => ({
      getContent() {
        return editorState.toHTML();
      },
      close() {
        setVisible(false);
      },
      getId() {
        return id;
      },
    })
  );

  return visible ? (
    <div className="md-wrap">
      <BraftEditor
        {...props}
        id="editor-with-code-highlighter"
        className={props.layout === "down" ? "md-editor min" : "md-editor"}
        onChange={setEditorState}
        value={editorState}
        controls={controlsMin as any}
      />
      <Button className="btn-comment" onClick={sendComment.bind(null, editorState.toHTML())}>
        评论
      </Button>
    </div>
  ) : null;
});

export default MdEditor;
