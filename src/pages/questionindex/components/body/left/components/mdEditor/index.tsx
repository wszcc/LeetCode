import "braft-editor/dist/index.css";
import { FC, memo, useState } from "react";
import BraftEditor from "braft-editor";
import "./style.scss";
import { Button } from "antd";

interface Props {
  mentionId?: number;
  mentionName?: string;
  onSubmit?(): void;
}

const controlsMin = ["code", "link"];

const MdEditor: FC<Props> = (props) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(props.mentionName || "")
  );

  const sendComment = props.onSubmit || (() => {});

  return (
    <div className="md-wrap">
      <BraftEditor
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
};
export default memo(MdEditor);
