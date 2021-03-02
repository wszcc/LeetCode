import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { FC, memo, useRef, useState } from "react";
import { ErrorCode } from "../../apis";
import { dispatchLike } from "../../apis/share";

const LikeBtn: FC<{
  islike: number;
  target: "comment" | "answer" | "question";
  targetId: string;
  likeNum?: number | null;
}> = (props) => {
  const [islike, setLike] = useState(props.islike);
  const [likeNum, setLikeNum] = useState(props.likeNum || 0);
  const available = useRef(true);

  const clickLikeBtn = async () => {
    if (available.current) {
      available.current = false;
      const res = await dispatchLike(props.target, islike, props.targetId);
      if (res.code === ErrorCode.Success) {
        setLikeNum(islike === 1 ? likeNum - 1 : likeNum + 1);
        setLike(islike === 1 ? 0 : 1);
      }
      available.current = true;
    }
  };

  return (
    <span onClick={clickLikeBtn}>
      {islike === 1 ? <LikeFilled /> : <LikeOutlined />}
      {props.likeNum !== undefined && likeNum}
    </span>
  );
};

export default memo(LikeBtn);
