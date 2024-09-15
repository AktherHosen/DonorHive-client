import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdCancel, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { IoAddCircleSharp } from "react-icons/io5";
import useAdmin from "../../hooks/useAdmin";
import { MdDeleteForever } from "react-icons/md";
import SectionTitle from "../../components/SectionTitle";
const Contents = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const { isAdmin, isVolunteer } = useAdmin();

  const getData = async () => {
    try {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/blogs?filter=${filter}`
      );
      setBlogs(result.data);
    } catch (err) {
      console.log(err?.message);
    }
  };

  const handleStatus = async (id, status) => {
    const newStatus = status === "published" ? "draft" : "published";
    if (status === "draft" && !isAdmin) return;

    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
        status: newStatus,
      });
      getData();
      toast.success("Blog status updated");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const handleDeleteConfirmation = (id) => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this blog?
          <div className="flex gap-2 mt-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(id, t)}
            >
              <MdDeleteForever size={20} />
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              <MdCancel size={20} />
            </button>
          </div>
        </span>
      ),
      { autoClose: 3000 }
    );
  };

  const handleDelete = async (id, toastInstance) => {
    if (!isAdmin) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`);
      toast.success("Blog Deleted Successfully.", { id: toastInstance.id });
      getData();
    } catch (err) {
      toast.error(err?.message, { id: toastInstance.id });
    }
  };

  useEffect(() => {
    getData();
  }, [filter]);

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <SectionTitle
          title="All Donation Requests"
          subTitle="Manage all donation request."
        />
        <div>
          <label htmlFor="filterStatus" className="label block text-sm">
            Filter By Status
          </label>
          <select
            name="filterStatus"
            id="filterStatus"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="border px-4 py-2 rounded-md w-36"
          >
            <option value="">All</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <Link
          to="add-blog"
          className="border rounded-full text-lg shadow-md p-0.5 hover:text-primary font-semibold"
        >
          <IoAddCircleSharp size={30} />
        </Link>
      </div>

      <div>
        {blogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-xs border">
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Blog Title</th>
                  <th>Content</th>
                  <th>Status</th>
                  <th>Manage Status</th>
                  {isAdmin && <th>Actions</th>}{" "}
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <img
                        src={blog.thumb}
                        className="h-12 w-20 rounded-md"
                        alt=""
                      />
                    </td>
                    <td>{blog.title}</td>
                    <td
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.descriptionContent.length > 60
                            ? `${blog.descriptionContent.substring(0, 70)}...`
                            : blog.descriptionContent,
                      }}
                    />
                    <td>{blog.status}</td>
                    <td>
                      {blog.status === "draft" ? (
                        isAdmin && (
                          <button
                            onClick={() => handleStatus(blog._id, blog.status)}
                            className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-50 text-primary font-semibold"
                          >
                            <div className="w-1 h-1 bg-primary rounded-full"></div>{" "}
                            publish
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => handleStatus(blog._id, blog.status)}
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-slate-50 text-primary font-semibold"
                        >
                          <div className="w-1 h-1 bg-primary rounded-full"></div>{" "}
                          unpublish
                        </button>
                      )}
                    </td>
                    {isAdmin && (
                      <td>
                        <button
                          onClick={() => handleDeleteConfirmation(blog._id)}
                          className="px-2 py-1 rounded-md bg-slate-100 text-primary text-xl"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 font-semibold text-start mt-4 text-sm">
            No Blogs Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Contents;
