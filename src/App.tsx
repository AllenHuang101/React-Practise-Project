import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getMenu } from "./api/users";
import { routes } from "./router";
import { setMenu } from "./store/login/authSlice";
import { generateRoutes } from "./utils/generatesRoutes";

function App() {
  const { token } = useSelector((state: any) => state.authSlice);
  const [routerss, setRouter] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadData() {
      const { data } = await getMenu();
      if (data.length) {
        dispatch(setMenu(data));
        const routers = generateRoutes(data); //动态创建的路由表
        const myRoutes = [...routes];
        myRoutes[0].children = routers;
        myRoutes[0].children[0].index = true;
        const router = createBrowserRouter(myRoutes);
        setRouter(router);
      } else {
        const router = createBrowserRouter(routes);
        setRouter(router);
      }
    }
    loadData();
  }, [token]);

  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={routerss}></RouterProvider>
        </Suspense>
      </div>
    );
  } else {
    // console.log("routerss", routerss);
    return <div>Loading...</div>;
  }
}

export default App;
