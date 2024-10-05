import React from "react";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { IoMailUnreadSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import stripeImg from "../../assets/stripe.png";
const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing our Newsletter.");
    e.target.reset();
  };
  return (
    <div className="bg-gray-900 text-white text-opacity-80 mt-10 ">
      <footer className="px-4 lg:px-16 text-white py-10  ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="col-span-2 mb-8 lg:mb-0 space-y-3">
            <h1 className="text-3xl font-semibold">
              Donor Hive{" "}
              <span className="text-primary font-bold text-4xl">.</span>
            </h1>
            <p className="text-gray-400 mb-4 text-sm">
              Thank you for visiting our blood donation website. Together, we
              can save lives and make a positive impact on those in need. Stay
              connected with us through our social media channels or contact us
              for more information. Your support and generosity help ensure that
              every drop counts. Let’s build a healthier and stronger
              community—one donation at a time
            </p>
            <ul className="text-gray-400">
              <li className="flex items-center">
                <div className="flex items-center gap-2">
                  <IoMailUnreadSharp /> donor@hive.com
                </div>
              </li>
              <li className="flex items-center mb-2">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt /> (+880) - 1610945101
                </div>
              </li>
            </ul>
          </div>

          <div className=" mb-8 lg:mb-0">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li>
                <Link to="/donors" className="hover:text-white">
                  Search Donor
                </Link>
              </li>
              <li>
                <Link to="/funding" className="hover:text-white">
                  Donate Fund
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-white">
                  Read Blogs
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registration" className="hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Subscribe</h3>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                className="px-2 py-3 rounded-tl-xl w-full text-black rounded-br-xl bg-gray-100 outline-none"
                placeholder="Enter your email"
                required
              />

              <button className="bg-primary mt-2 rounded-tl-xl rounded-br-xl text-white px-6 py-2  hover:scale-105 ">
                Subscribe
              </button>
            </form>
            <div className="my-4">
              <h3 className="font-semibold text-xs uppercase mb-2">Donate</h3>
              <img
                src={stripeImg}
                className="h-6 bg-white p-1 rounded-sm"
                alt=""
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
