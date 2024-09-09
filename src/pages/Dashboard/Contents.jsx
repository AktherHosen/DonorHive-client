import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
const Contents = () => {
  const [blogs, setBlogs] = useState([]);

  const getData = async () => {
    try {
      const result = await axios(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(result.data);
    } catch (err) {
      console.log(err?.message);
    }
  };
  const handleStatus = async (id, status) => {
    // console.log(id, status);
    const newStatus = status === "draft" ? "published" : "draft";
    try {
      const result = await axios.patch(
        `${import.meta.env.VITE_API_URL}/blog/${id}`,
        { status: newStatus }
      );
      getData();
    } catch (err) {
      console.log(err?.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blog/${id}`
      );
      toast.success("Blog Deleted Successfully.");
      getData();
    } catch (err) {
      console.log(err?.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="pr-8 w-96 md:w-full lg:w-ful">
      <div className="flex justify-end">
        <Link
          to="add-blog"
          className="px-4 py-2 text-sm bg-primary rounded-md text-white font-semibold"
        >
          Add Blog
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Blog Title</th>
                <th>Content</th>

                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <th>{blog.thumb}</th>
                  <td>{blog.title}</td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.descriptionContent.length > 60
                          ? `${blog.descriptionContent.substring(0, 70)}...`
                          : blog.descriptionContent,
                    }}
                  />

                  <td>
                    {blog.status === "draft" ? (
                      <button
                        onClick={() => handleStatus(blog._id, blog.status)}
                        className="px-4 py-1 rounded-full text-xs bg-slate-50 text-primary font-semibold"
                      >
                        publish
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatus(blog._id, blog.status)}
                        className="px-4 py-1 rounded-full text-xs bg-slate-50 text-primary font-semibold"
                      >
                        unpublish
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-2 py-1 rounded-md  bg-slate-100 text-primary text-xl"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contents;
