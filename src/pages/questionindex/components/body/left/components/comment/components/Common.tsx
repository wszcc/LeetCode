import { FC, memo, useEffect, useState } from "react";
import Editor from "../../mdEditor";
import {
  LikeOutlined,
  CommentOutlined,
  FormOutlined,
  LikeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "../style.scss";
import { getReply } from "../../../../../../../../apis/comments";
import { ErrorCode } from "../../../../../../../../apis";
import { wrapRequest } from "../../../../../../../../utils/hooks";
import { Flags } from "../../../../../../../../utils/shared";
interface P {
  userName: string;
  avatar: string;
  content: string;
  likeNum: number;
  parentId: number;
  commentTime: string | null;
  islike: boolean;
  replyNum?: number;
  isRoot?: boolean;
}

interface Sub {
  at: string;
  content: string;
  nickname: string;
  avatar: string;
  userId: number;
  commentId: number;
  commentTime: null | string;
  thumbup: null | number;
  islike: boolean;
}

const Common: FC<P> = ({
  content,
  commentTime,
  parentId,
  replyNum,
  userName,
  avatar,
  likeNum,
  islike,
  isRoot = true,
}) => {
  const [sub, setSub] = useState<Sub[]>([]);
  const [visible, setVisible] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  console.log(subLoading);

  const queryReply = async () => {
    console.log("send");

    setShowSub(!showSub);
    if (showSub) return;
    setSubLoading(true);
    const res = await getReply(parentId);
    setSubLoading(false);
    if (res.code === ErrorCode.Success) {
      setSub(res.data);
    }
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
            {islike ? <LikeFilled /> : <LikeOutlined />}
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
        <div className="edit">{visible && <Editor />}</div>
        <a href="/#anchor"></a>
        {isRoot && showSub && !subLoading ? (
          <div className="sub-comment">
            {sub.map((item) => {
              return (
                <Common
                  userName={item.nickname}
                  avatar={item.avatar}
                  parentId={parentId}
                  islike={item.islike}
                  likeNum={item.thumbup ? item.thumbup : 0}
                  content={item.content}
                  commentTime={item.commentTime}
                  isRoot={false}
                />
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <LoadingOutlined />
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(Common);

const useSubComment = wrapRequest(getReply);
