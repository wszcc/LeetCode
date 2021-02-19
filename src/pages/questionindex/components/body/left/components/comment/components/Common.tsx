import { FC, memo, useEffect, useRef, useState } from "react";
import Editor from "../../mdEditor";
import {
  LikeOutlined,
  CommentOutlined,
  FormOutlined,
  LikeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "../style.scss";
import { getReply, sendComment } from "../../../../../../../../apis/comments";
import { ErrorCode } from "../../../../../../../../apis";
import { wrapRequest } from "../../../../../../../../utils/hooks";
import { Flags, storage } from "../../../../../../../../utils/shared";
interface P {
  userName: string;
  avatar: string;
  content: string;
  likeNum: number;
  parentId: string;
  commentTime: string | null;
  commentId: string;
  islike: number;
  replyNum?: number;
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
  thumbup: null | number;
  islike: number;
}

const Common: FC<P> = ({
  content,
  commentTime,
  parentId,
  replyNum,
  userName,
  avatar,
  likeNum,
  commentId,
  islike,
  isRoot = true,
}) => {
  const [sub, setSub] = useState<Sub[]>([]);
  const [visible, setVisible] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const editor = useRef<{
    getContent(): string;
  }>(null);

  const queryReply = async () => {
    setShowSub(!showSub);
    if (sub.length) return;
    if (showSub) return;
    setSubLoading(true);
    const res = await getReply(parentId);
    setSubLoading(false);
    if (res.code === ErrorCode.Success) {
      setSub(res.data);
    }
  };

  const dispatchComment = async () => {
    console.log(editor.current?.getContent()!);
    
    const res = await sendComment(
      parentId,
      storage.get("userId")!,
      editor.current?.getContent()!
    );
  };

  return (
    <div>
      <div className="comment-item">
        <div className="flex j-between a-center">
          <div className="header-avatar flex a-center">
            <img src={avatar} alt={userName} />
            <span>{userName}</span>
          </div>
          <span className="comment-time">{commentTime}</span>
        </div>
        <div className="item-content">{content}</div>
        <div className="item-footer  flex ">
          <div>
            {islike === 1 ? <LikeFilled /> : <LikeOutlined />}
            {likeNum}
          </div>
          {isRoot && (
            <div onClick={queryReply}>
              <CommentOutlined />
              查看{replyNum}条评论
            </div>
          )}
          <div onClick={setVisible.bind(null, !visible)}>
            <FormOutlined />
            回复
          </div>
        </div>
      </div>
      <div className="sub">
        <div className="edit">
          {visible && (
            <Editor
              ref={editor}
              onSubmit={dispatchComment}
              mentionName={userName}
            />
          )}
        </div>
        {isRoot && showSub && (
          <div className="sub-comment">
            {sub.map((item, i) => {
              return (
                <Common
                  key={i}
                  userName={item.nickname}
                  avatar={item.avatar}
                  parentId={parentId}
                  islike={item.islike}
                  likeNum={item.thumbup ? item.thumbup : 0}
                  content={item.content}
                  commentTime={item.commentTime}
                  commentId={item.commentId}
                  isRoot={false}
                />
              );
            })}
            {subLoading && (
              <div style={{ textAlign: "center" }}>
                <LoadingOutlined />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Common);

const useSubComment = wrapRequest(getReply);
