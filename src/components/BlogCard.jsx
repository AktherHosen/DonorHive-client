import React from "react";
import { Link } from "react-router-dom";

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
    <div className="">
      <div className="border rounded-md">
        <img src={thumb} alt={title} className="w-full p-2 h-[300px]" />
      </div>
      <div className="py-3 px-2 ">
        <h1 className="font-bebas font-medium tracking-wide text-lg ">
          {title}
        </h1>
        <p
          className="text-gray-600 text-sm mb-3"
          dangerouslySetInnerHTML={getTruncatedDescription()}
        />
        <Link
          to={`/blog-detail/${_id}`}
          className="hover:text-primary font-semibold hover:underline hover:transition-all hover:duration-200 "
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
