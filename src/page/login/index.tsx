import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import bg from "../../assets/bg.jpg";
import lgbg from "../../assets/lgbg.jpg";
import logo from "../../assets/logo.png";

import { useDispatch } from "react-redux";
import { login } from "../../api/users";
import { setToken } from "../../store/login/authSlice";

import "./index.scss";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function handleLogin() {
    // console.log(form);
    form
      .validateFields()
      .then(async (res) => {
        // console.log("res:", res);
        const {
          data: { token },
        } = await login(res);

        // console.log("token:", token);
        dispatch(setToken(token));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
