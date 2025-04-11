import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
interface MenuItem {
  key: string;
  label: string;
  children?: MenuItem[];
}

function findBreadCrumbPath(path: string, menuItems: MenuItem[]): string[] {
  const pathSegments: string[] = [];
  function findPath(currentPath: string, items: MenuItem[]) {
    for (const item of items) {
      if (currentPath.startsWith(item.key)) {
        pathSegments.push(item.label);
        if (item.children) {
          findPath(currentPath, item.children);
        }
        break;
      }
    }
    // console.log("pathSegments", pathSegments);
    return pathSegments;
  }
  return findPath(path, menuItems);
}

function MyBreadCrumb() {
  const location = useLocation();
  const { menuList } = useSelector((state: any) => state.authSlice);
  const breadList = findBreadCrumbPath(location.pathname, menuList).map(
    (item) => ({ title: item })
  );

  return <Breadcrumb items={breadList} className="mt mb" />;
}

export default MyBreadCrumb;
