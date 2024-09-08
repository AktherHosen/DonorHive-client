import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <div className="navbar bg-base-100 px-0">
      <div className="navbar-start">
        <img src={logo} className="h-12" alt="" />
        <NavLink
          to="/"
          className="text-xl text-primary font-bebas font-bold uppercase"
        >
          Donor <br />
        </NavLink>
        <span className="text-xs -mt-1 uppercase ms-1 font-bold"> Hive</span>
      </div>

      {/* Centered menu for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/donation">Donation Request</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/funding">Funding Request</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {!user && (
          <NavLink
            to="/login"
            className="px-4 py-2 hidden lg:flex rounded-md border bg-primary text-white cursor-pointer "
          >
            Login
          </NavLink>
        )}

        {user && (
          <div className="w-10 rounded-full lg:hidden">
            <img
              alt="User Profile"
              className="rounded-full"
              src={user?.photoURL}
            />
          </div>
        )}
        {/* Profile Dropdown for larger screens */}
        {user && (
          <div className="dropdown dropdown-left dropdown-bottom hidden lg:flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Profile" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2 -mr-10"
            >
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>

              <li>
                <button
                  onClick={() => logOut()}
                  className="bg-primary shadow-lg hover:bg-white hover:text-primary border-2 text-white font-semibold w-full px-4 py-2 rounded-md"
                >
                  Log Out <CiLogout size={16} className="font-bold" />
                </button>
              </li>
            </ul>
          </div>
        )}

        {/* Dropdown toggle for mobile */}
        <div className="lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="px-2 py-2 w-[40px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen ? (
              <GiHamburgerMenu size={30} />
            ) : (
              <RiCloseLargeFill size={30} />
            )}
          </div>

          {/* Mobile menu items */}
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu bg-base-100 w-full p-4 space-y-2 absolute left-0 top-16 z-50"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/donation">Donation Request</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>

              {user ? (
                <>
                  <li>
                    <NavLink to="/funding">Funding Request</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button className="bg-primary shadow-lg hover:bg-white hover:text-primary border-2 text-white font-semibold w-fit px-4 py-2 rounded-md">
                      Log Out <CiLogout size={16} className="font-bold" />
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-md border-2 bg-primary text-white cursor-pointer hover:bg-white hover:text-primary font-bold w-fit"
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
