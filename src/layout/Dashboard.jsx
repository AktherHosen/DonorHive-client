import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="flex  lg:px-0">
        <div>
          <Sidebar />
        </div>
        <main className="flex-1 px-20 py-10 lg:px-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
