import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Gallery.css";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/gallery");
      console.log("gallery data:", res.data);
      setGalleryData(res.data);
    } catch (error) {
      console.log("Error fetching gallery:", error);
    }
  };

  const categories = ["All", "Classroom", "Students", "Lab", "Events"];

  const filteredImages =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">Our Training Institute Gallery</h1>

      <div className="gallery-filters">
        {categories.map((category, index) => (
          <button
            key={index}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map((item, index) => (
          <div
            className="gallery-card"
            key={item.id || index}
            onClick={() => setLightbox(item)}
          >
            <img src={item.imageurl} alt={item.name} />
            <div className="gallery-overlay">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.imageurl} alt="preview" />
          <span className="close-btn">×</span>
        </div>
      )}
    </div>
  );
};

export default Gallery;
