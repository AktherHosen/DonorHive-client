import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Main = () => {
  return (
    <>
      {/* Navbar  */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-2 lg:px-0 font-inter min-h-[calc(100vh-20px)]">
        <Navbar />
        <Outlet />
      </div>
      {/* footer  */}
      <Footer />
    </>
  );
};

export default Main;
