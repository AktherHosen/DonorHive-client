import React from "react";

const SectionTitle = ({ title, subTitle }) => {
  return (
    <div>
      <h1 className="font-bebas font-bold text-lg uppercase">{title}</h1>
      <h4 className="text-sm font-medium">{subTitle}</h4>
    </div>
  );
};

export default SectionTitle;
