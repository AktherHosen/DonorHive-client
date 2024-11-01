import React from "react";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div className="border-b">
      <h1 className="font-bebas font-normal text-xl uppercase tracking-wider">
        {title}
      </h1>
      <h4 className="text-md font-normal uppercase font-bebas tracking-wider">
        {subTitle}
      </h4>
    </div>
  );
};

export default SectionTitle;
