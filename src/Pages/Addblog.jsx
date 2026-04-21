import React, { useState } from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/AddBlog.css";
import axios from "axios";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.category || !blog.image || !blog.description) {
      toast.warning("Please fill all fields");
      return;
    }

    const toastId = toast.loading("Publishing blog...");

    try {
      const res = await axios.post("http://localhost:8080/api/blogs", blog);

      console.log(res.data);

      toast.update(toastId, {
        render: "Blog added successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setBlog({
        title: "",
        category: "",
        image: "",
        description: "",
      });
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Error adding blog ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="addblog-container">
        <div className="addblog-header">
          <h1>Add New Blog ✍️</h1>
          <p>Create blog content for your website</p>
        </div>

        <div className="addblog-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Blog Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter the title"
                value={blog.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter blog category"
                value={blog.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={blog.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter course description"
                rows="5"
                value={blog.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="publish-btn" type="submit">
              Publish Blog 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;