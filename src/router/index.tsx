import React from "react";
import { RouteObject } from "react-router-dom";
import RequireAuth from "../utils/RequireAuth";

const Home = React.lazy(() => import("../page/home"));
const Login = React.lazy(() => import("../page/login"));
const NotFound = React.lazy(() => import("../page/404"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <RequireAuth allowed={true} redirectTo="/login">
//         <Home />
//       </RequireAuth>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <RequireAuth allowed={false} redirectTo="/">
//         <Login />
//       </RequireAuth>
//     ),
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RequireAuth allowed={true} redirectTo="/login">
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: (
      <RequireAuth allowed={false} redirectTo="/dashboard">
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
