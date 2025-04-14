import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import zhTW from 'antd/locale/zh_TW';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.scss";
import "./mock";
import { store } from "./store/index.ts";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ConfigProvider locale={zhTW}>
      <App />
    </ConfigProvider>
  </Provider>
);
