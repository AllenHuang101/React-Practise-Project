import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";

import { useEffect } from "react";
import http from "../../utils/http";
import "./index.scss";

function Login() {
  const [form] = Form.useForm();

  function handleLogin() {
    // console.log(form);
    form
      .validateFields()
      .then((res) => {
        console.log("res:", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    http({
      method: "post",
      url: "/login",
      data: {
        username: "赵铁柱",
        password: "123456",
      },
    })
      .then((res) => {
        console.log("請求結果是", res);
      })
      .catch((err) => {
        console.log("登入失敗", err);
      });
  }, []);

  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} width={100} />
            </div>
            <h1>朋遠智慧園區管理平台</h1>
          </div>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "用戶名不能為空" },
                // { min: 3, max: 5, message: "用戶名只能 3~5 位字符" },
                {
                  pattern: /^\w{4,8}$/,
                  message: "用戶名只能 4~8 位數字字母字符",
                },
              ]}
            >
              <Input placeholder="請輸入您的用戶名" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "密碼不能為空" }]}
            >
              <Input.Password
                placeholder="請輸入您的密碼"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={handleLogin}
              >
                登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
