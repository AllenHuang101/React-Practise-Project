import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { generateRoutes } from "./utils/generatesRoutes";

function App() {
  const { menuList } = useSelector((state: any) => state.authSlice);

  useEffect(() => {
    const routers = generateRoutes(menuList);
    console.log("routers", routers);
    console.log("menuList", menuList);
  }, [menuList]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
