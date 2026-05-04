import React, { useEffect, useState } from "react";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "../Styles/Addblog.css";

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axiosInstance.get("/api/blogs");
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch blogs error:", error);
      toast.error(error.response?.data || "Failed to load blogs");
    }
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setBlog({
      title: "",
      category: "",
      image: "",
      description: "",
    });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setBlog({
      title: item.title || "",
      category: item.category || "",
      image: item.image || "",
      description: item.description || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalType("delete");
    setShowModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      toast.warning("Select at least one blog");
      return;
    }

    setModalType("bulk-delete");
    setShowModal(true);
  };

  const confirmDeleteBlog = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting blog...");

    try {
      await axiosInstance.delete(`/api/blogs/${deleteId}`);

      toast.update(toastId, {
        render: "Blog deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setDeleteId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Delete blog error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Failed to delete blog ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmBulkDeleteBlog = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting selected blogs...");

    try {
      await axiosInstance.delete("/api/blogs/bulk-delete", {
        data: selectedIds,
      });

      toast.update(toastId, {
        render: "Selected blogs deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSelectedIds([]);
      fetchBlogs();
    } catch (error) {
      console.error("Bulk delete blog error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Bulk delete failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmUpdateBlog = async () => {
    setShowModal(false);

    const toastId = toast.loading("Updating blog...");

    try {
      await axiosInstance.put(`/api/blogs/${editId}`, blog);

      toast.update(toastId, {
        render: "Blog updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Update blog error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Error updating blog ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !blog.title.trim() ||
      !blog.category.trim() ||
      !blog.image.trim() ||
      !blog.description.trim()
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (editId) {
      setModalType("update");
      setShowModal(true);
      return;
    }

    const toastId = toast.loading("Publishing blog...");

    try {
      await axiosInstance.post("/api/blogs", blog);

      toast.update(toastId, {
        render: "Blog added successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Add blog error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Error adding blog ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="adb-wrap-new">
      <AdminSidebar />

      <main className="adb-main-new">
        <div className="adb-head-new">
          <h1>{editId ? "Edit Blog ✏️" : "Add New Blog ✍️"}</h1>
          <p>
            {editId
              ? "Update blog content for your website"
              : "Create blog content for your website"}
          </p>
        </div>

        <div className="adb-card-new">
          <form onSubmit={handleSubmit} className="adb-form-new">
            <div className="adb-field-new">
              <label>Blog Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={blog.category}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={blog.image}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new adb-textarea-new">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                value={blog.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="adb-submit-new">
              {editId ? "Update Blog ✅" : "Publish Blog 🚀"}
            </button>

            {editId && (
              <button
                type="button"
                className="adb-cancel-new"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* LIST SECTION unchanged */}
      </main>
    </div>
  );
};

export default AddBlog;