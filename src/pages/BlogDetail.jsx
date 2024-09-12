import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaFacebookSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const currentUrl = window.location.href;
  useEffect(() => {
    const getData = async (id) => {
      try {
        const result = await axios(
          `${import.meta.env.VITE_API_URL}/blog/${id}`
        );
        setBlog(result.data);
      } catch (err) {
        toast.error(err?.message);
      }
    };
    getData(id);
  }, [id]);

  const getTruncatedDescription = () => {
    if (!blog.descriptionContent) return { __html: "" }; // Handle case where descriptionContent might be undefined
    const truncatedContent = blog.descriptionContent;
    return { __html: truncatedContent };
  };

  const { thumb, title } = blog;

  return (
    <>
      <Helmet>
        <title>Blog Details</title>
      </Helmet>
      <div className="px-10 py-4 flex  justify-center flex-col">
        <div className="max-w-2xl mx-auto ">
          <img src={thumb} alt={title} className=" w-full h-[300px]" />
        </div>
        <div className="mt-4 space-y-3 text-start">
          <h3 className="font-semibold font-bebas text-lg">{title}</h3>
          <div
            className="text-justify"
            dangerouslySetInnerHTML={getTruncatedDescription()}
          />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
