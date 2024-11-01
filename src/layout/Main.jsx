import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const Main = () => {
  const location = useLocation();
  const withoutHeaderFooter = location.pathname.includes("dashboard");
  return (
    <>
      {/* Navbar  */}
      {withoutHeaderFooter || <Navbar />}
      <div className="max-w-[1400px] mx-auto  font-inter min-h-[calc(100vh-20px)]">
        <Outlet />
      </div>
      {/* footer  */}

      {withoutHeaderFooter || <Footer />}
    </>
  );
};

export default Main;
