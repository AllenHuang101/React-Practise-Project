import Mock from "mockjs";

//登录接口
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
  return {
    code: 200,
    message: "登录成功",
    data: {
      username: "赵铁柱",
      token: "mocktoken123456admin",
      btnAuth: ["add", "edit", "delete"],
    },
  };
});
