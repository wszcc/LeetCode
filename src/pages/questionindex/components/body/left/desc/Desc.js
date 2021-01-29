import { data } from "./data";
import "./desc.scss";
import {
  LikeOutlined,
  HeartOutlined,
  RotateRightOutlined,
  SwapOutlined,
  BellOutlined,
  MessageOutlined,
} from "@ant-design/icons";
console.log(data);
const Desc = (props) => {
  return (
    <div className="desc">
      <div className="title">{data.data.title}</div>
      <ul className="tag">
        <li>难度 </li>
        <li>
          <LikeOutlined />
          {data.data.thumbup}
        </li>
        <li>
          <HeartOutlined /> 收藏
        </li>
        <li>
          <RotateRightOutlined /> 分享
        </li>
        <li>
          <SwapOutlined /> 切换为英文
        </li>
        <li>
          <BellOutlined /> 接收动态
        </li>
        <li>
          <MessageOutlined /> 反馈
        </li>
      </ul>
        <div className='content'>{data.data.content}</div>
    </div>
  );
};

export default Desc;
