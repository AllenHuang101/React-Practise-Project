import { Button } from "antd";
import { FC } from "react";

interface ButtonProps {
  type?: string;
  children: React.ReactNode;
}

const XuButton: FC<ButtonProps> = (props) => {
  const cssStyle = {
    padding: "10px 20px",
    borderRadius: "10px",
    backgroundColor: props.type === "primary" ? "blue" : "",
  };
  return <button style={cssStyle}>{props.children}</button>;
};

function Home() {
  return (
    <div className="home">
      我是home組件
      <Button type="primary">我是一個按鈕</Button>
      <XuButton>我是一個自定義按鈕</XuButton>
    </div>
  );
}

export default Home;
