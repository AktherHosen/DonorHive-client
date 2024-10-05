import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { ImFacebook2 } from "react-icons/im";
import { SiWhatsapp } from "react-icons/si";
import Container from "../components/Container";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const currentUrl = window.location.href;
  console.log(currentUrl);
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
    if (!blog.descriptionContent) return { __html: "" };
    const truncatedContent = blog.descriptionContent;
    return { __html: truncatedContent };
  };

  const { thumb, title } = blog;

  return (
    <>
      <Helmet>
        <title>Blog Details</title>
      </Helmet>
      <Container className="px-10 py-4 flex  justify-center flex-col">
        <div className="max-w-2xl mx-auto ">
          <img src={thumb} alt={title} className=" w-full h-[300px]" />
        </div>
        <div className="mt-4 space-y-3 text-start">
          <h3 className="font-medium tracking-widest underline underline-offset-4 font-bebas text-lg">
            {title}
          </h3>
          <div
            className="text-justify text-lg"
            dangerouslySetInnerHTML={getTruncatedDescription()}
          />
          <div className="border-t">
            <h2 className="font-bebas font-normal uppercase tracking-wider my-2">
              Share this blog
            </h2>
            <div className="flex items-center gap-x-3">
              <FacebookShareButton url={currentUrl}>
                <ImFacebook2 size={25} className="text-blue-800 " />
              </FacebookShareButton>
              <WhatsappShareButton url={currentUrl}>
                <SiWhatsapp size={25} className="text-green-800" />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogDetail;
