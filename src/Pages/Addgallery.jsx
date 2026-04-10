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

      setMessage("Gallery image added successfully");
      setTitle("");
      setCategory("");
      setImage(null);
      e.target.reset();
    } catch (error) {
      console.log(error);
      setMessage("Failed to upload gallery image");
    }
  };

  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="add-gallery-container">
        <div className="add-gallery-card">
          <h2>Add Gallery Image</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Classroom">Classroom</option>
              <option value="Students">Students</option>
              <option value="Lab">Lab</option>
              <option value="Events">Events</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">Upload Image</button>
          </form>

          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
