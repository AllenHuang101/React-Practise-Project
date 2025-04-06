import Mock from "mockjs";

//登录接口
Mock.mock("https://www.demo.com/login", "post", (options: any) => {
  const { username, password } = JSON.parse(options.body);

  if (username === "admin" && password === "admin123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "赵铁柱",
        token: "mocktoken123456admin",
        btnAuth: ["add", "edit", "delete"],
      },
    };
  } else if (username === "manager" && password === "manager123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "manager",
        token: "mocktoken123456manager",
        btnAuth: ["add", "edit"],
      },
    };
  } else if (username == "user" && password === "user123123") {
    return {
      code: 200,
      message: "登录成功",
      data: {
        username: "user",
        token: "mocktoken123456user",
        btnAuth: ["add"],
      },
    };
  } else {
    return {
      code: 401,
      message: "用户名或密码有误",
      data: "",
    };
  }
});
