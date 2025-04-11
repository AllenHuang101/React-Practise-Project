import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import icons from "./iconList";
import "./index.scss";

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface MenuItemFromData {
  key: string;
  label: string;
  icon: string;
  children?: MenuItemFromData[];
}

// const items: MenuItem[] = [
//   { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
//   { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
//   { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
//   {
//     key: "sub1",
//     label: "Navigation One",
//     icon: <MailOutlined />,
//     children: [
//       { key: "5", label: "Option 5" },
//       { key: "6", label: "Option 6" },
//       { key: "7", label: "Option 7" },
//       { key: "8", label: "Option 8" },
//     ],
//   },
//   {
//     key: "sub2",
//     label: "Navigation Two",
//     icon: <AppstoreOutlined />,
//     children: [
//       { key: "9", label: "Option 9" },
//       { key: "10", label: "Option 10" },
//       {
//         key: "sub3",
//         label: "Submenu",
//         children: [
//           { key: "11", label: "Option 11" },
//           { key: "12", label: "Option 12" },
//         ],
//       },
//     ],
//   },
// ];

function NavLeft() {
  const { menuList } = useSelector((state: any) => state.authSlice);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location", location.pathname);
  useEffect(() => {
    configMenu();
  }, [menuList]);
  async function configMenu() {
    const mappedMenuItems: MenuItem[] = mapMenuItems(menuList);
    setMenuData(mappedMenuItems);
  }

  //将返回的菜单数据转换成我们需要的格式
  function mapMenuItems(items: MenuItemFromData[]): any {
    return items.map((item: MenuItemFromData) => ({
      key: item.key,
      label: item.label,
      icon: icons[item.icon],
      children: item.children ? mapMenuItems(item.children) : null, //递归操作
    }));
  }

  function handleClick({ key }: { key: string }) {
    navigate(key);
  }

  return (
    <div className="navleft">
      <div className="logo">
        <img src={logo} alt="" width={18} />
        <h1>朋遠智慧園區</h1>
      </div>
      <Menu
        defaultSelectedKeys={["/dashboard"]}
        mode="inline"
        theme="dark"
        items={menuData}
        onClick={handleClick}
        selectedKeys={[location.pathname]}
      />
    </div>
  );
}

export default NavLeft;
