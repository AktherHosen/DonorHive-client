import React from "react";
import Banner from "../components/Home/Banner";
import Featured from "../components/Home/Featured";
import Contact from "../components/Home/Contact";

const Home = () => {
  return (
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Banner />
      <Featured />
      <Contact />
    </div>
  );
};

export default Home;
