import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-blogs?status=published`
        );
        setBlogs(result.data);
      } catch (err) {
        toast.error(err?.message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <h1>Blogs are coming soon.{blogs.length}</h1>
    </div>
  );
};

export default Blogs;
