import React, { useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleCreateContent = (e) => {
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
    console.log(blogInfo);

    // Reset content and form fields
    setContent("");
    form.reset();
  };

  return (
    <div className="pr-8 w-96 md:w-full lg:w-full">
      <SectionTitle title="Create Blog" subTitle="create your blog" />

      <form
        onSubmit={handleCreateContent}
        className="lg:w-full border-2 px-4 py-10 space-y-2"
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
  );
};

export default CreateBlog;
