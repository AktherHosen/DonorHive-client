import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoCreateSharp, IoHome } from "react-icons/io5";
import { MdContentCopy, MdDashboardCustomize } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { RiExpandLeftRightLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
const Sidebar = () => {
  const { isAdmin, isVolunteer } = useAdmin();
  const { user, logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <div className="bg-primary text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                src={logo}
                className="bg-gray-100 mr-2"
                alt="logo"
                width="50"
                height="50"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-primary"
        >
          <RiExpandLeftRightLine className="h-7 w-7" />
        </button>
      </div>
      <hr />
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-primary text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-sm rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <img
                  src={logo}
                  alt="logo"
                  className="bg-gray-100 mr-2"
                  width="50"
                  height="50"
                />
              </Link>
              <h2 className="uppercase font-bold font-bebas text-xl">
                Donor Hive
              </h2>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform     ${
                    isActive ? "bg-gray-100  text-black" : ""
                  }`
                }
              >
                <IoHome className="w-5 h-5" />
                <span className="mx-4 font-medium">Home</span>
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  ${
                    isActive ? "bg-gray-100  text-black" : ""
                  }`
                }
              >
                <MdDashboardCustomize className="w-5 h-5" />
                <span className="mx-4 font-medium">Dashboard</span>
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform   ${
                      isActive ? "bg-gray-100 text-black" : ""
                    }`
                  }
                >
                  <PiUsersThreeFill className="w-5 h-5" />
                  <span className="mx-4 font-medium">Users</span>
                </NavLink>
              )}

              {(isAdmin || isVolunteer) && (
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform   ${
                      isActive ? "bg-gray-100  text-black" : ""
                    }`
                  }
                >
                  <VscGitPullRequestNewChanges className="w-5 h-5" />
                  <span className="mx-4 font-medium">
                    All Donation Requests
                  </span>
                </NavLink>
              )}

              {(isAdmin || isVolunteer) && (
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform   ${
                      isActive ? "bg-gray-100 text-black " : ""
                    }`
                  }
                >
                  <MdContentCopy className="w-5 h-5" />
                  <span className="mx-4 font-medium">Content</span>
                </NavLink>
              )}

              {!isAdmin && !isVolunteer && (
                <>
                  <NavLink
                    to="/dashboard/create-donation-reqeust"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform   ${
                        isActive ? "bg-gray-100 text-black" : ""
                      }`
                    }
                  >
                    <IoCreateSharp className="w-5 h-5" />
                    <span className="mx-4 font-medium">
                      Post Donation Request
                    </span>
                  </NavLink>

                  <NavLink
                    to="/dashboard/my-donation-requests"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  ${
                        isActive ? "bg-gray-100 text-black" : ""
                      }`
                    }
                  >
                    <BiSolidUser className="w-5 h-5" />
                    <span className="mx-4 font-medium">
                      My Donation Requests
                    </span>
                  </NavLink>
                </>
              )}
              {isAdmin && (
                <NavLink
                  to="/dashboard/donated"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform   ${
                      isActive ? "bg-gray-100 text-black" : ""
                    }`
                  }
                >
                  <FaHistory className="w-5 h-5" />
                  <span className="mx-4 font-medium">Donation History</span>
                </NavLink>
              )}
            </nav>
          </div>
        </div>

        <div className=" border-t-2">
          <div className="mt-3 flex flex-row-reverse justify-between items-center">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center transition-colors duration-300 h-[50px] w-[60px] rounded-[100%] transform p-1  ${
                  isActive ? "bg-gray-100  text-black" : ""
                }`
              }
            >
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-full w-full rounded-[100%] border"
              />
            </NavLink>
            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2  transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
