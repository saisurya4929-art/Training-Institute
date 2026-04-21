import React, { useState } from "react";
import "../Styles/Addgallery.css";
import AdminSidebar from "./Adminsidebar";
import axios from "axios";
import { toast } from "react-toastify";

const AddGallery = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !image) {
      toast.warning("Please fill all fields");
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
        },
      });

      toast.update(toastId, {
        render: "Gallery image added successfully ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTitle("");
      setCategory("");
      setImage(null);
      e.target.reset();
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
    <div className="admin-gallery-page">
      <AdminSidebar />

      <div className="admin-gallery-main">
        <div className="admin-gallery-form-wrap">
          <div className="admin-gallery-card">
            <div className="admin-gallery-heading">
              <h2>Add Gallery Image</h2>
              <p>
                Upload and manage institute gallery images with premium admin
                experience.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="admin-gallery-form">
              <div className="admin-gallery-input-group">
                <label>Image Title</label>
                <input
                  type="text"
                  placeholder="Enter image title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="admin-gallery-input-group">
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

              <div className="admin-gallery-input-group">
                <label>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {image && (
                <div className="admin-gallery-preview">
                  <p>Selected File: {image.name}</p>
                </div>
              )}

              <button type="submit" className="admin-gallery-btn">
                Upload Image
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;