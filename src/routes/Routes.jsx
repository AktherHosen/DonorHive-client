import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Blogs from "../pages/Blogs";
import Dashboard from "../layout/Dashboard";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import Users from "../pages/Dashboard/Users";
import Contents from "../pages/Dashboard/Contents";
import CreateBlog from "../pages/Dashboard/CreateBlog";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import UpdateDonationRequest from "../pages/Dashboard/UpdateDonationRequest";
import DonationRequestDetails from "../pages/Dashboard/DonationRequestDetails";
import AllBloodDonationRequests from "../pages/Dashboard/AllBloodDonationRequests";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogDetail from "../pages/BlogDetail";
import Profile from "../pages/Dashboard/Profile";
import Donors from "../pages/Donors";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import PrivateRoute from "./PrivateRoute";
import Funding from "../pages/Funding";
import AdminRoute from "./AdminRoute";
import Payment from "../pages/Payment";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
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
        path: "/blog-detail/:id",
        element: (
          <PrivateRoute>
            <BlogDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/donation-requests",
        element: <BloodDonationRequests />,
      },
      {
        path: "/donors",
        element: <Donors />,
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "create-donation-reqeust",
            element: <CreateDonationRequest />,
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
            element: (
              <AdminRoute>
                <Contents />
              </AdminRoute>
            ),
          },
          {
            path: "content-management/add-blog",
            element: (
              <AdminRoute>
                <CreateBlog />
              </AdminRoute>
            ),
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
