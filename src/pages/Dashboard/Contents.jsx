import React from "react";
import { Link } from "react-router-dom";

const Contents = () => {
  return (
    <div className="">
      <h1>All content are managed here.</h1>
      <Link to="add-blog">Add Blog</Link>
    </div>
  );
};

export default Contents;
