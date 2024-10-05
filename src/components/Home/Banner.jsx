import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Container from "../Container";
const Banner = () => {
  const { user } = useAuth();
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center  justify-between">
        <div className="flex items-center pt-8 md:pt-0">
          <div className="text-center md:text-start">
            <h1 className="text-5xl uppercase font-semibold">
              Donate <br />
            </h1>
            <h2 className="text-6xl font-bebas font-bold uppercase text-primary">
              Your blood
            </h2>
            <div className="mt-4 flex gap-4">
              {!user ? (
                <Link
                  to="/registration"
                  className="border-2 px-3 py-2 lg:px-4 lg:py-3 rounded-md hover:bg-primary hover:text-white text-sm lg:text-lg font-semibold"
                >
                  Join as a Donor
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="border-2 px-3 py-2 lg:px-4 lg:py-3  rounded-md hover:bg-primary hover:text-white text-sm lg:text-lg font-semibold"
                >
                  Join as a Donor
                </Link>
              )}
              <Link
                to="/donors"
                className="px-3 py-2 lg:px-4 lg:py-3 bg-primary text-white rounded-md border-2 outline-none font-semibold text-sm lg:text-lg flex items-center gap-3"
              >
                Search Donor <FaSearch size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co.com/gD7N7NN/25543-ai.png" alt="" />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
