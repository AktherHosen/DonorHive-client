import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Tooltip } from "react-tooltip";
import { NavLink } from "react-router-dom";
import { IoCreateSharp, IoHome } from "react-icons/io5";
import { MdContentCopy, MdDashboardCustomize } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";
import { PiUsersThreeFill } from "react-icons/pi";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import {
  TbLayoutSidebarRightCollapseFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import "react-tooltip/dist/react-tooltip.css";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  // TODO : get isAdmin value from database
  const isAdmin = true;
  return (
    <aside
      className={`min-h-[800px] bg-primary ${
        expanded ? "w-64" : "w-16"
      } lg:w-64 lg:relative fixed top-0 left-0  border-r shadow-sm transition-all`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 mt-4 h-[60px] pb-2 flex justify-between items-center">
          <div
            className={`transition-all ${
              expanded ? "w-10" : "w-0"
            } overflow-hidden`}
          >
            <img src={logo} className="bg-white rounded-md" alt="" />
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 lg:hidden"
          >
            {expanded ? (
              <TbLayoutSidebarRightCollapseFilled size={20} />
            ) : (
              <TbLayoutSidebarRightExpandFilled size={20} />
            )}
          </button>
        </div>
        <ul className="flex-1 px-3 text-white">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-home"
              data-tooltip-content="Home"
            >
              <IoHome size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                Home
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-home" />}
          </li>
          {isAdmin ? (
            <>
              {" "}
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                      isActive
                        ? "bg-white text-primary"
                        : "bg-primary text-white"
                    }`
                  }
                  data-tooltip-id="tooltip-users"
                  data-tooltip-content="All Users"
                >
                  <PiUsersThreeFill size={20} />
                  <span
                    className={`transition-all ${
                      expanded ? "ml-3" : "hidden lg:block ml-2"
                    }`}
                  >
                    Users
                  </span>
                </NavLink>
                {!expanded && <Tooltip id="tooltip-users" />}
              </li>
            </>
          ) : (
            <></>
          )}

          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-dashboard"
              data-tooltip-content="Dashboard"
            >
              <MdDashboardCustomize size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                Dashboard
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-dashboard" />}
          </li>
          <li>
            <NavLink
              to="/dashboard/create-donation-reqeust"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-create"
              data-tooltip-content="Create Donation Request"
            >
              <IoCreateSharp size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                Post Donation Request
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-create" />}
          </li>
          <li>
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-my-requests"
              data-tooltip-content="My Donation Requests"
            >
              <BiSolidUser size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                My Donation Requests
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-my-requests" />}
          </li>

          <li>
            <NavLink
              to="/dashboard/all-blood-donation-request"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-requests"
              data-tooltip-content="All Donation Requests"
            >
              <VscGitPullRequestNewChanges size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                All Donation Requests
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-requests" />}
          </li>
          <li>
            <NavLink
              to="/dashboard/content-management"
              className={({ isActive }) =>
                `relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group h-[40px] ${
                  isActive ? "bg-white text-primary" : "bg-primary text-white"
                }`
              }
              data-tooltip-id="tooltip-content"
              data-tooltip-content="Content Management"
            >
              <MdContentCopy size={20} />
              <span
                className={`transition-all ${
                  expanded ? "ml-3" : "hidden lg:block ml-2"
                }`}
              >
                Content
              </span>
            </NavLink>
            {!expanded && <Tooltip id="tooltip-content" />}
          </li>
        </ul>
        <div className="border-t flex p-3">
          <img src={logo} className="w-10 h-10 bg-white rounded-md" alt="" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "hidden lg:block ml-2"
            }`}
          >
            <div className="leading-4">
              <h3 className="font-semibold text-white">Donor Hive</h3>
              <span className="text-xs text-white">Donorhive@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
