import React, { useState } from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/Addgallery.css";

const AdminGallery = () => {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="gallery-content">
        <h2>Gallery Upload</h2>

        <label className="gallery-upload-box">
          <input type="file" multiple onChange={handleUpload} />
          <h3>Upload Gallery Images</h3>
          <p>Click here to add institute images</p>
        </label>

        <div className="gallery-preview-grid">
          {images.map((img, index) => (
            <div className="gallery-preview-card" key={index}>
              <p>{img.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;