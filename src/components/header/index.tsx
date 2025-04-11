import {
  DownOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { clearToken } from "../../store/login/authSlice";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <a target="_blank">個人中心</a>,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: <a target="_blank">退出登入</a>,
    icon: <PoweroffOutlined />,
  },
];

function MyHeader() {
  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    // console.log(key);
    if (key === "1") {
      console.log("個人中心");
    } else if (key === "2") {
      dispatch(clearToken());
      sessionStorage.removeItem("username");
    }
  };

  return (
    <div>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            歡迎您, {sessionStorage.getItem("username")}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default MyHeader;
