import { FC, memo, useContext, useRef, useState } from "react";
import Editor, { EditorRef } from "../../mdEditor";
import {
  CommentOutlined,
  FormOutlined,
  ShareAltOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import "../style.scss";
import { getReply, sendComment } from "../../../../../../../../apis/comments";
import { ErrorCode } from "../../../../../../../../apis";
import { Flags, getTime, storage } from "../../../../../../../../utils/shared";
import { ActiveEditorId } from "..";
import Loading from "../../../../../../../../components/loading";
import LikeBtn from "../../../../../../../../components/likeBtn";
import BraftEditor from "braft-editor";
interface P {
  userName: string;
  avatar: string;
  content: string;
  thumbup: number | null;
  parentId: string;
  commentTime: string | null;
  commentId: string;
  islike: number;
  replyNum?: number | null;
  isRoot?: boolean;
}

interface Sub {
  at: string;
  content: string;
  nickname: string;
  avatar: string;
  userId: string;
  commentId: string;
  commentTime: null | string;
  thumbup: number | null;
  islike: number;
}

const Common: FC<P> = ({
  content,
  commentTime,
  parentId,
  replyNum,
  userName,
  avatar,
  thumbup,
  commentId,
  islike,
  isRoot = true,
}) => {
  const [sub, setSub] = useState<Sub[]>([]);
  const [showSub, setShowSub] = useState(false);
  const [flag, setFlag] = useState(Flags.Normal);
  const { id, setId } = useContext(ActiveEditorId);
  const editor = useRef<EditorRef>(null);

  const queryReply = async () => {
    setShowSub(!showSub);
    if (sub.length) return;
    if (showSub) return;
    setFlag(Flags.Pending);
    const res = await getReply(parentId);
    if (res.code === ErrorCode.Success) {
      setSub(res.data);
      setFlag(Flags.Success);
    } else {
      setFlag(Flags.Fail);
    }
  };

  const dispatchComment = async () => {
    const res = await sendComment(
      parentId,
      storage.get("userId")!,
      editor.current?.getContent()!
    );

    if (res.code === ErrorCode.Success) {
      
    }
  };

  const swapEditor = () => {
    const editorId = editor.current!.getId();
    setId(editorId);
  };

  return (
    <div>
      <div className="comment-item">
        <div className="flex j-between a-center">
          <div className="header-avatar flex a-center">
            <Image
              src={avatar}
              alt={userName}
              fallback={
                "https://assets.leetcode-cn.com/aliyun-lc-upload/default_avatar.png"
              }
            />
            <span>{userName}</span>
          </div>
          <span className="comment-time">{getTime(commentTime || "")}</span>
        </div>
        <div className="item-content">
          <BraftEditor
            value={BraftEditor.createEditorState(content)}
            controls={[]}
            readOnly={true}
          />
        </div>
        <div className="item-footer  flex ">
          <div>
            <LikeBtn
              islike={islike}
              target="comment"
              targetId={commentId}
              likeNum={thumbup}
            />
          </div>
          {isRoot && (
            <div onClick={queryReply}>
              <CommentOutlined />
              查看{replyNum || 0}条评论
            </div>
          )}
          <div onClick={swapEditor}>
            <FormOutlined />
            回复
          </div>
          <div className="show-onHover">
            <ShareAltOutlined />
            分享
          </div>
          <div className="show-onHover">
            <WarningOutlined />
            举报
          </div>
        </div>
      </div>
      <div className="sub">
        <div className="edit">
          <Editor
            visible={id === editor.current?.getId()}
            ref={editor}
            onSubmit={dispatchComment}
            mentionName={userName}
          />
        </div>
        {isRoot && showSub && (
          <div className="sub-comment">
            {sub.map((item, i) => {
              return (
                <Common
                  key={i}
                  userName={item.nickname}
                  avatar={item.avatar}
                  parentId={commentId}
                  islike={item.islike}
                  thumbup={item.thumbup ? item.thumbup : 0}
                  content={item.content}
                  commentTime={item.commentTime}
                  commentId={item.commentId}
                  isRoot={false}
                />
              );
            })}
            {flag === Flags.Pending ? (
              <div style={{ textAlign: "center" }}>
                <Loading />
              </div>
            ) : flag === Flags.Fail ? (
              "网络出错，请尝试刷新"
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Common);
