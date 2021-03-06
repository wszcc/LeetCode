import { Divider, message, Select } from "antd";
import { Components } from "antd/lib/date-picker/generatePicker";
import {
  createContext,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ErrorCode } from "../../../../../../../apis";
import {
  Comment,
  queryComments,
  sendComment,
} from "../../../../../../../apis/comments";
import Loading from "../../../../../../../components/loading";
import { useGetQuestionId } from "../../../../../../../utils/hooks";
import { storage } from "../../../../../../../utils/shared";
import MdEditor from "../mdEditor";
import Common from "./components/Common";

interface CommentsProps {}

/**
 * 为了在其它编辑器打开的时候关闭其它的，因此需要给每一个设置一个id
 */
export const ActiveEditorId = createContext({
  id: -1,
  setId(id: number) {},
});

const CommentFC: FC<CommentsProps> = () => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [curPage, setCurPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const questionId = useGetQuestionId();
  const [sortBy, setSortBy] = useState(-1); //0: 热度 1: 时间

  const getComments = useCallback(async (pageNum: number, parentId: any) => {
    const res = await queryComments(pageNum, parentId);
    if (res.code === ErrorCode.Success) {
      setPageNum(res.data.totalPage);
      setComments(res.data.g);
      setSortBy(0)
    } else {
      setPageNum(0);
      setComments([]);
    }
  }, []);

  const updateComments = (at: string, content: string) => {
    const newVal = comments?.slice();
    if (newVal) {
      newVal.push({
        avatar: storage.get("avatar")!,
        content,
        userId: storage.get("userId")!,
        nickname: storage.get("username")!,
        thumbup: 0,
        replyNum: 0,
        commentTime: new Date().toString(),
        islike: 0,
        commentId: Math.random() * 10000000 + "",
      });
      setComments(newVal);
      setSortBy(1);
    }
  };

  useEffect(() => {
    getComments(curPage, questionId);
  }, [curPage, questionId, getComments]);

  const sendClick = async (content: string) => {
    // if (questionId) {
    //   sendComment(questionId, storage.get("userId")!, content);
    //   const res = await sendComment("1", "狂拽酷炫吊炸天", content);
    //   if (res.code === ErrorCode.Success) {
    //   }
    // } else {
    //   message.info({
    //     content: "请先登陆",
    //   });
    // }
    const res = await sendComment("1", "狂拽酷炫吊炸天", content);
    if (res.code === ErrorCode.Success) {
      updateComments("", content);
    }
  };

  useEffect(() => {
    setComments((oldComments) => {
      const val = oldComments?.slice();
      if (val) {
        switch (sortBy) {
          case 0:
            val.sort((next, prev) => prev.thumbup - next.thumbup);
            break;
          case 1:
            val.sort(
              (next, prev) =>
                Date.parse(prev.commentTime) - Date.parse(next.commentTime)
            );
            break;
        }
      }
      return val || oldComments;
    });
  }, [sortBy]);

  const [id, setId] = useState(-1);

  return (
    <ActiveEditorId.Provider
      value={{
        id,
        setId,
      }}
    >
      <div className="comment-main">
        <div className="flex j-between">
          <div>
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
          </div>
          <Select
            onChange={(value: number) => {
              setSortBy(value);
            }}
            defaultValue={0}
          >
            <Select.Option value={0}>热度</Select.Option>
            <Select.Option value={1}>时间</Select.Option>
          </Select>
        </div>
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
          <div className="flex j-center">
            <Loading size="large" />
          </div>
        )}
      </div>
    </ActiveEditorId.Provider>
  );
};

export default memo(CommentFC);
