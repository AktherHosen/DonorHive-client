import React, { useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreateContent = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const descriptionContent = content;
    const thumb = form.thumb.value;
    const status = "draft";
    const blogInfo = {
      title,
      descriptionContent,
      thumb,
      status,
    };
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog`,
        blogInfo
      );
    } catch (err) {
      toast.error(err?.message);
    }

    setContent("");
    form.reset();
    navigate("/dashboard/content-management");
  };

  return (
    <div>
      <div className="my-4">
        <SectionTitle title="Blog" subTitle="Create your blog" />
      </div>
      <div>
        <form
          onSubmit={handleCreateContent}
          className="lg:w-full border-2 px-4 py-10 space-y-2 "
        >
          <div>
            <label htmlFor="title" className="block mb-2 text-sm">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              className="px-4 py-2 rounded-md w-full border-2"
            />
          </div>
          <div>
            <label htmlFor="thumb" className="block mb-2 text-sm">
              Blog Thumbnail
            </label>
            <input
              type="text"
              name="thumb"
              placeholder="Enter Thumbnail Link"
              className="px-4 py-2 rounded-md w-full border-2"
            />
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-primary text-white text-sm my-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
