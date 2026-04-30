import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Gallery.css";
import GallerySkeleton from "../components/GallerySkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get("http://localhost:8080/api/gallery");
      setGalleryData(res.data);
    } catch (error) {
      console.log("Error fetching gallery:", error);
      setError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Classroom", "Students", "Lab", "Events"];

  const filteredImages =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  if (loading) {
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

        <GallerySkeleton />
      </div>
    );
  }

  if (error) {
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

        <p className="no-data">{error}</p>
      </div>
    );
  }

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

      <ErrorBoundary>
        <div className="gallery-grid">
          {filteredImages.length > 0 ? (
            filteredImages.map((item, index) => (
              <div
                className="gallery-card"
                key={item.id || index}
                onClick={() => setLightbox(item)}
              >
                <img
                  src={`http://localhost:8080/uploads/${item.imageurl}`}
                  alt={item.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300";
                  }}
                />
                <div className="gallery-overlay">
                  <h3>{item.name}</h3>
                  <p>{item.category}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No gallery images found</p>
          )}
        </div>
      </ErrorBoundary>

      {lightbox && (
        <ErrorBoundary>
          <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
            <img
              src={`http://localhost:8080/uploads/${lightbox.imageurl}`}
              alt="preview"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/700x500";
              }}
            />
            <span className="close-btn">×</span>
          </div>
        </ErrorBoundary>
      )}
    </div>
  );
};

export default Gallery;
