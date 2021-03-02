import { CSSProperties, FC } from "react";

const sizeTable = {
  large: "70px",
  medium: "50px",
  small: "30px",
};

const Loading: FC<{
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  size?: "large" | "medium" | "small";
}> = (props) => {
  return props.visible === undefined ? (
    <img
      className={props.className}
      style={{
        ...props.style,
        width: props.size ? sizeTable[props.size] : sizeTable["small"],
      }}
      src="https://assets.leetcode-cn.com/common/light-loading.gif"
      alt="loading"
    />
  ) : null;
};

export default Loading;
