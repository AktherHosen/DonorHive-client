import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

const BlogCard = ({ blog }) => {
  const { _id, thumb, title, descriptionContent } = blog;

  const getTruncatedDescription = () => {
    const truncatedContent =
      descriptionContent.length > 70
        ? `${descriptionContent.substring(0, 100)}...`
        : descriptionContent;
    return { __html: truncatedContent };
  };

  return (
    <div className="min-w-[60%] lg:max-w-[75%] bg-white shadow-md rounded-xl">
      <img
        src={thumb}
        alt={title}
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h1 className=" font-bebas tracking-wider font-normal text-lg ">
          {title}
        </h1>

        <p
          className="text-gray-600 text-sm mb-3"
          dangerouslySetInnerHTML={getTruncatedDescription()}
        />

        <div className="flex justify-end">
          <Link
            to={`/blog-detail/${_id}`}
            className="hover:text-primary font-semibold hover:underline hover:transition-all hover:duration-200 "
          >
            <HiArrowNarrowRight className="font-bold text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
