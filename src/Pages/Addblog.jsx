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
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
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
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
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

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setDeleteId(null);
  };

  const handleModalConfirm = async () => {
    const currentModalType = modalType;
    const currentDeleteId = deleteId;
    const currentSelectedIds = [...selectedIds];

    closeModal();

    if (currentModalType === "delete") {
      const toastId = toast.loading("Deleting blog...");

      try {
        await axiosInstance.delete(`/api/blogs/${currentDeleteId}`);

        toast.update(toastId, {
          render: "Blog deleted successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setBlogs((prev) =>
          prev.filter((item) => item.id !== currentDeleteId)
        );

        setSelectedIds((prev) =>
          prev.filter((id) => id !== currentDeleteId)
        );
      } catch (error) {
        console.error("Delete blog error:", error);

        toast.update(toastId, {
          render: error.response?.data || "Delete failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

      return;
    }

    if (currentModalType === "bulk-delete") {
      const toastId = toast.loading("Deleting selected blogs...");

      try {
        await axiosInstance.delete("/api/blogs/bulk-delete", {
          data: currentSelectedIds,
        });

        toast.update(toastId, {
          render: "Selected blogs deleted successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setBlogs((prev) =>
          prev.filter((item) => !currentSelectedIds.includes(item.id))
        );

        setSelectedIds([]);
      } catch (error) {
        console.error("Bulk delete blog error:", error);

        toast.update(toastId, {
          render: error.response?.data || "Bulk delete failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }

      return;
    }

    if (currentModalType === "update") {
      const toastId = toast.loading("Updating blog...");

      try {
        const response = await axiosInstance.put(`/api/blogs/${editId}`, blog);

        toast.update(toastId, {
          render: "Blog updated successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setBlogs((prev) =>
          prev.map((item) =>
            item.id === editId
              ? {
                  ...item,
                  title: response.data?.title || blog.title,
                  category: response.data?.category || blog.category,
                  image: response.data?.image || blog.image,
                  description: response.data?.description || blog.description,
                }
              : item
          )
        );

        resetForm();
      } catch (error) {
        console.error("Update blog error:", error);

        toast.update(toastId, {
          render: error.response?.data || "Update failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
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
      const response = await axiosInstance.post("/api/blogs", blog);

      toast.update(toastId, {
        render: "Blog added successfully 🚀",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      if (response.data && response.data.id) {
        setBlogs((prev) => [response.data, ...prev]);
      } else {
        fetchBlogs();
      }

      resetForm();
    } catch (error) {
      console.error("Add blog error:", error);

      toast.update(toastId, {
        render: error.response?.data || "Add blog failed ❌",
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
                placeholder="Enter blog title"
              />
            </div>

            <div className="adb-field-new">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={blog.category}
                onChange={handleChange}
                placeholder="Enter category"
              />
            </div>

            <div className="adb-field-new">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={blog.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            <div className="adb-field-new adb-textarea-new">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                value={blog.description}
                onChange={handleChange}
                placeholder="Enter blog description"
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

        <section className="adb-list-new">
          <div className="adb-list-header-new">
            <h2>All Blogs</h2>

            <button
              type="button"
              className="adb-delete-new"
              onClick={handleBulkDelete}
              disabled={selectedIds.length === 0}
            >
              Delete Selected ({selectedIds.length})
            </button>
          </div>

          <div className="adb-blog-grid-new">
            {blogs.length > 0 ? (
              blogs.map((item) => (
                <div className="adb-blog-card-new" key={item.id}>
                  <div className="adb-select-row-new">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                    />
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x250";
                    }}
                  />

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
              ))
            ) : (
              <p>No blogs found</p>
            )}
          </div>
        </section>
      </main>

      {showModal && (
        <Modal
          isOpen={showModal}
          title={
            modalType === "delete"
              ? "Delete Blog"
              : modalType === "bulk-delete"
              ? "Delete Selected Blogs"
              : "Update Blog"
          }
          onClose={closeModal}
          size="small"
        >
          <p>
            {modalType === "delete"
              ? "Are you sure you want to delete this blog?"
              : modalType === "bulk-delete"
              ? `Are you sure you want to delete ${selectedIds.length} selected blog(s)?`
              : "Are you sure you want to update this blog?"}
          </p>

          <div className="modal-footer-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="button"
              className={
                modalType === "delete" || modalType === "bulk-delete"
                  ? "modal-delete-btn"
                  : "modal-update-btn"
              }
              onClick={handleModalConfirm}
            >
              {modalType === "delete" || modalType === "bulk-delete"
                ? "Delete"
                : "Update"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddBlog;