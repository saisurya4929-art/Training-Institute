import React, { useState } from "react";
import "../Styles/Addgallery.css";
import AdminSidebar from "./Adminsidebar";
import axios from "axios";

const AddGallery = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !image) {
      setMessage("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/gallery/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Gallery image added successfully ✅");
      setTitle("");
      setCategory("");
      setImage(null);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setMessage("Failed to upload gallery image ❌");
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

            {message && <p className="admin-gallery-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;