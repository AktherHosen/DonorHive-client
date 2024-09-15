import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="relative min-h-screen md:flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 md:ml-64">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
