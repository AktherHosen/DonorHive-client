import React from "react";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div>
      <h1 className="font-bebas font-medium text-xl uppercase tracking-wider">
        {title}
      </h1>
      <h4 className="text-md font-medium uppercase font-bebas tracking-wide">
        {subTitle}
      </h4>
    </div>
  );
};

export default SectionTitle;
