import React, { useEffect, useState } from "react";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import axios from "axios";
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

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blogs");
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
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
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
      await axios.delete(
        `http://localhost:8080/api/blogs/${deleteId}`,
        authHeader
      );

      toast.update(toastId, {
        render: "Blog deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setDeleteId(null);
      fetchBlogs();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Failed to delete blog ❌",
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
      await axios.delete("http://localhost:8080/api/blogs/bulk-delete", {
        data: selectedIds,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      console.error(error);

      toast.update(toastId, {
        render: "Bulk delete failed ❌",
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
      await axios.put(
        `http://localhost:8080/api/blogs/${editId}`,
        blog,
        authHeader
      );

      toast.update(toastId, {
        render: "Blog updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error(error);

      toast.update(toastId, {
        render: "Error updating blog ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.category || !blog.image || !blog.description) {
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
      await axios.post("http://localhost:8080/api/blogs", blog, authHeader);

      toast.update(toastId, {
        render: "Blog added successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchBlogs();
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
                placeholder="Enter the title"
                value={blog.title}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new">
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Enter blog category"
                value={blog.category}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={blog.image}
                onChange={handleChange}
              />
            </div>

            <div className="adb-field-new adb-textarea-new">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter blog description"
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

        <div className="adb-list-new">
          <h2>All Blogs</h2>

          {selectedIds.length > 0 && (
            <button
              type="button"
              className="adb-delete-new"
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <div className="adb-blog-grid-new">
            {blogs.map((item) => (
              <div className="adb-blog-card-new" key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />

                <img src={item.image} alt={item.title} />

                <div className="adb-blog-info-new">
                  <h3>{item.title}</h3>
                  <h4>{item.category}</h4>
                  <p>{item.description}</p>

                  <div className="adb-actions-new">
                    <button
                      type="button"
                      className="adb-edit-new"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="adb-delete-new"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalType === "update" ? "Confirm Update" : "Confirm Delete"}
          size="small"
        >
          <p>
            {modalType === "update" &&
              "Are you sure you want to update this blog?"}

            {modalType === "delete" &&
              "Are you sure you want to delete this blog?"}

            {modalType === "bulk-delete" &&
              `Are you sure you want to delete ${selectedIds.length} selected blogs?`}
          </p>

          <div className="modal-footer-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className={
                modalType === "update"
                  ? "modal-update-btn"
                  : "modal-delete-btn"
              }
              onClick={
                modalType === "update"
                  ? confirmUpdateBlog
                  : modalType === "delete"
                  ? confirmDeleteBlog
                  : confirmBulkDeleteBlog
              }
            >
              {modalType === "update" ? "Update" : "Delete"}
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default AddBlog;