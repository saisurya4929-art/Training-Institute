import React, { useEffect, useState } from "react";
import AdminSidebar from "./Adminsidebar";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "../Styles/Addgallery.css";

const AddGallery = () => {
  const [galleryList, setGalleryList] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/gallery");
      setGalleryList(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load gallery");
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setImage(null);
    setEditId(null);

    const fileInput = document.getElementById("galleryImageInput");
    if (fileInput) fileInput.value = "";
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setTitle(item.name);
    setCategory(item.category);
    setImage(null);

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
      toast.warning("Select at least one gallery image");
      return;
    }

    setModalType("bulk-delete");
    setShowModal(true);
  };

  const confirmDeleteGallery = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting gallery image...");

    try {
      await axios.delete(
        `http://localhost:8080/api/gallery/${deleteId}`,
        authHeader
      );

      toast.update(toastId, {
        render: "Gallery image deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setDeleteId(null);
      fetchGallery();
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to delete gallery image ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmBulkDeleteGallery = async () => {
    setShowModal(false);

    const toastId = toast.loading("Deleting selected gallery images...");

    try {
      await axios.delete("http://localhost:8080/api/gallery/bulk-delete", {
        data: selectedIds,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.update(toastId, {
        render: "Selected gallery images deleted successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setSelectedIds([]);
      fetchGallery();
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Bulk delete failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const confirmUpdateGallery = async () => {
    setShowModal(false);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    const toastId = toast.loading("Updating gallery image...");

    try {
      await axios.put(
        `http://localhost:8080/api/gallery/${editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.update(toastId, {
        render: "Gallery image updated successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchGallery();
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to update gallery image ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category) {
      toast.warning("Please fill title and category");
      return;
    }

    if (!editId && !image) {
      toast.warning("Please select an image");
      return;
    }

    if (editId) {
      setModalType("update");
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    const toastId = toast.loading("Uploading image...");

    try {
      await axios.post("http://localhost:8080/api/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.update(toastId, {
        render: "Gallery image added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      resetForm();
      fetchGallery();
    } catch (error) {
      console.log(error);

      toast.update(toastId, {
        render: "Failed to upload gallery image ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="adg-wrap-new">
      <AdminSidebar />

      <main className="adg-main-new">
        <div className="adg-head-new">
          <h1>{editId ? "Edit Gallery Image ✏️" : "Add Gallery Image 🖼️"}</h1>
          <p>
            {editId
              ? "Update gallery image details"
              : "Upload and manage institute gallery images"}
          </p>
        </div>

        <div className="adg-card-new">
          <form onSubmit={handleSubmit} className="adg-form-new">
            <div className="adg-field-new">
              <label>Image Title</label>
              <input
                type="text"
                placeholder="Enter image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="adg-field-new">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Classroom">Classroom</option>
                <option value="Students">Students</option>
                <option value="Lab">Lab</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <div className="adg-field-new">
              <label>{editId ? "Change Image Optional" : "Upload Image"}</label>

              <input
                id="galleryImageInput"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {image && (
              <div className="adg-preview-new">
                <p>Selected File: {image.name}</p>
              </div>
            )}

            <button type="submit" className="adg-submit-new">
              {editId ? "Update Image" : "Upload Image"}
            </button>

            {editId && (
              <button
                type="button"
                className="adg-cancel-new"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="adg-list-new">
          <h2>All Gallery Images</h2>

          {selectedIds.length > 0 && (
            <button
              type="button"
              className="adg-delete-new"
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <div className="adg-grid-new">
            {galleryList.map((item) => (
              <div className="adg-img-card-new" key={item.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                />

                <img
                  src={`http://localhost:8080/uploads/${item.imageurl}`}
                  alt={item.name}
                />

                <div className="adg-info-new">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>

                  <div className="adg-actions-new">
                    <button
                      className="adg-edit-new"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="adg-delete-new"
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
              "Are you sure you want to update this gallery image?"}

            {modalType === "delete" &&
              "Are you sure you want to delete this gallery image?"}

            {modalType === "bulk-delete" &&
              `Are you sure you want to delete ${selectedIds.length} selected gallery images?`}
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
                  ? confirmUpdateGallery
                  : modalType === "delete"
                  ? confirmDeleteGallery
                  : confirmBulkDeleteGallery
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

export default AddGallery;
