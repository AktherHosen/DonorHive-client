import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <p>404, Not found</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
    ],
  },
]);
export default router;
