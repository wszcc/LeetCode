import { Divider } from "antd";
import { FC, memo, useEffect, useState } from "react";
import { ErrorCode } from "../../../../../../../apis";
import { Comment, queryComments } from "../../../../../../../apis/comments";
import { Flags } from "../../../../../../../utils/shared";
import MdEditor from "../mdEditor";
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
    <div className="comment-main">
      <span
        style={{
          fontWeight: 8000,
          fontSize: "20px",
          color: "#595959",
          marginRight: "5px"
        }}
      >
        {768}
      </span>
      条评论
      <MdEditor />
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
