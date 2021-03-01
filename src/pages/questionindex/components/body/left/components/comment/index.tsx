import { Divider, message } from "antd";
import { createContext, FC, memo, useEffect, useState } from "react";
import { Dispatch } from "redux";
import { ErrorCode } from "../../../../../../../apis";
import {
  Comment,
  queryComments,
  sendComment,
} from "../../../../../../../apis/comments";
import { useGetQuestionId } from "../../../../../../../utils/hooks";
import { Flags, storage } from "../../../../../../../utils/shared";
import MdEditor from "../mdEditor";
import Common from "./components/Common";

interface CommentsProps {}

export const ActiveEditorId = createContext({
  id: -1,
  setId(id: number) {},
});

const CommentFC: FC<CommentsProps> = (props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const questionId = useGetQuestionId();

  const send = async (pageNum: number, parentId: any) => {
    const res = await queryComments(pageNum, parentId);
    if (res.code === ErrorCode.Success) {
      setPageNum(res.data.totalPage);
      setComments(res.data.g);
    }
  };

  useEffect(() => {
    send(curPage, questionId);
  }, [curPage, questionId]);

  const sendClick = async (content: string) => {
    if (questionId) {
      sendComment(questionId, storage.get("userId")!, content);
    } else {
      message.info({
        content: "请先登陆",
      });
    }
  };

  const [id, setId] = useState(-1);

  return (
    <ActiveEditorId.Provider
      value={{
        id,
        setId,
      }}
    >
      <div className="comment-main">
        <span
          style={{
            fontWeight: 8000,
            fontSize: "20px",
            fontFamily: "Tahoma",
            color: "#595959",
            marginRight: "5px",
          }}
        >
          {768}
        </span>
        条评论
        <MdEditor onSubmit={sendClick as any} />
        <Divider
          style={{
            borderTopColor: "#bfbfbf",
          }}
        >
          <span
            style={{
              color: "#bfbfbf",
              fontSize: "14px",
            }}
          >
            精选评论
          </span>
        </Divider>
        {comments ? (
          comments.map((item) => (
            <Common
              key={item.commentId}
              userName={item.nickname}
              avatar={item.avatar}
              content={item.content}
              thumbup={item.thumbup}
              replyNum={item.replyNum}
              parentId={questionId!}
              commentTime={item.commentTime}
              commentId={item.commentId}
              islike={item.islike}
            />
          ))
        ) : (
          <div>loading...</div>
        )}
      </div>
    </ActiveEditorId.Provider>
  );
};

export default memo(CommentFC);
