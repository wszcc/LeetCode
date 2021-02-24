import { FC, memo, useEffect, useState } from "react";
import { ErrorCode } from "../../../../../../../apis";
import { Comment, queryComments } from "../../../../../../../apis/comments";
import { Flags } from "../../../../../../../utils/shared";
import Common from "./components/Common";

interface CommentsProps {
  parentId: string;
}

const CommentFC: FC<CommentsProps> = (props) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);

  const send = async (pageNum: number, parentId: any) => {
    const res = await queryComments(pageNum, parentId);
    if (res.code === ErrorCode.Success) {
      setPageNum(res.data.totalPage);
      setComments(res.data.g);
    }
  };

  useEffect(() => {
    send(curPage, props.parentId);
  }, [curPage, props.parentId]);

  return (
    <div>
      {comments ? (
        comments.map((item) => (
          <Common
            userName={item.nickname}
            avatar={item.avatar}
            content={item.content}
            thumbup={item.thumbup}
            replyNum={item.replyNum}
            parentId={props.parentId}
            commentTime={item.commentTime}
            commentId={item.commentId}
            islike={item.islike}
          />
        ))
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default memo(CommentFC);
