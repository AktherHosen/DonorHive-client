import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 px-0">
      <div className="navbar-start">
        <NavLink to="/" className="text-xl font-bebas font-bold uppercase">
          Donor Hive
        </NavLink>
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
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        <NavLink
          to="/login"
          className="px-4 py-2 rounded-md border text-black cursor-pointer"
        >
          Login
        </NavLink>

        <div className="w-10 rounded-full lg:hidden">
          <img
            alt="Tailwind CSS Navbar component"
            className="rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        {/* Profile Dropdown for larger screens */}
        <div className="dropdown dropdown-left dropdown-bottom hidden lg:flex">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2 -mr-10"
          >
            <li>
              <NavLink className="justify-between">Profile</NavLink>
            </li>
            <li>
              <NavLink>Dashboard</NavLink>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>

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
              className="menu bg-base-100 w-full p-4 space-y-2 absolute left-0 top-16 z-50 "
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/donation">Donation Request</NavLink>
              </li>
              <li>
                <NavLink>Donation Request</NavLink>
              </li>
              <li>
                <NavLink>Blog</NavLink>
              </li>

              <li>
                <NavLink>Profile</NavLink>
              </li>
              <li>
                <NavLink>Dashboard</NavLink>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
