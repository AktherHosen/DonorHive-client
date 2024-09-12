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
import Contents from "../pages/Dashboard/Contents";
import CreateBlog from "../pages/Dashboard/CreateBlog";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import UpdateDonationRequest from "../pages/Dashboard/UpdateDonationRequest";
import DonationRequestDetails from "../pages/Dashboard/DonationRequestDetails";
import AllBloodDonationRequests from "../pages/Dashboard/AllBloodDonationRequests";
import BloodDonationRequests from "../pages/BloodDonationRequests";

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
        path: "/donation-requests",
        element: <BloodDonationRequests />,
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
            path: "all-users",
            element: <Users />,
          },
          {
            path: "all-blood-donation-request",
            element: <AllBloodDonationRequests />,
          },
          {
            path: "content-management",
            element: <Contents />,
          },
          {
            path: "content-management/add-blog",
            element: <CreateBlog />,
          },
          {
            path: "my-donation-requests",
            element: <MyDonationRequests />,
          },
          {
            path: "update-donation-request/:id",
            element: <UpdateDonationRequest />,
          },
          {
            path: "donation-request-details/:id",
            element: <DonationRequestDetails />,
          },
        ],
      },
    ],
  },
]);
export default router;
