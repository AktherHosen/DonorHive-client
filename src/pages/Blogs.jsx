import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import SectionTitle from "../components/SectionTitle";
import BlogCard from "../components/BlogCard";

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
    <div className="px-4 md:px-3 lg:px-2 mt-2">
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <SectionTitle title="Blogs" subTitle="Read, Learn and Grow" />
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No published blog found.</p>
      )}
    </div>
  );
};

export default Blogs;
