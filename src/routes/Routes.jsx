import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Blogs from "../pages/Blogs";
import Dashboard from "../layout/Dashboard";
import CrateDonationRequest from "../pages/Dashboard/CrateDonationRequest";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import Users from "../pages/Dashboard/Users";
import DonationRequests from "../pages/Dashboard/DonationRequests";
import Contents from "../pages/Dashboard/Contents";
import CreateBlog from "../pages/Dashboard/CreateBlog";
import DashboardHome from "../pages/Dashboard/DashboardHome";

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
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "create-donation-reqeust",
            element: <CrateDonationRequest />,
          },
          {
            path: "my-donation-requests",
            element: <MyDonationRequests />,
          },
          {
            path: "all-users",
            element: <Users />,
          },
          {
            path: "all-blood-donation-request",
            element: <DonationRequests />,
          },
          {
            path: "content-management",
            element: <Contents />,
          },
          {
            path: "content-management/add-blog",
            element: <CreateBlog />,
          },
        ],
      },
    ],
  },
]);
export default router;