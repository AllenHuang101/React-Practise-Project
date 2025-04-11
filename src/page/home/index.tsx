import { Layout, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import MyBreadCrumb from "../../components/breadCrumb";
import MyHeader from "../../components/header";
import NavLeft from "../../components/navLeft";

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <NavLeft />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingRight: "20px",
            background: colorBgContainer,
            textAlign: "right",
          }}
        >
          <MyHeader />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <MyBreadCrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
