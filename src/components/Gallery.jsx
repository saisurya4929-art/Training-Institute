import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../Styles/Gallery.css";
import GallerySkeleton from "../components/GallerySkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

const setCache = (key, data) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({ data, expiry: Date.now() + 5 * 60 * 1000 })
  );
};

const getCache = (key) => {
  const cache = sessionStorage.getItem(key);
  if (!cache) return null;

  try {
    const parsed = JSON.parse(cache);

    if (Date.now() > parsed.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch {
    sessionStorage.removeItem(key);
    return null;
  }
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["All", "Classroom", "Students", "Lab", "Events"];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const cached = getCache("galleryCache");

    if (cached) {
      setGalleryData(cached);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/api/gallery");

      const galleryList = Array.isArray(res.data) ? res.data : [];

      setGalleryData(galleryList);
      setCache("galleryCache", galleryList);
    } catch (error) {
      console.log("Error fetching gallery:", error);
      setError(error.response?.data || "Failed to load gallery images.");
      setGalleryData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  const renderFilters = () => (
    <div className="gallery-filters">
      {categories.map((category, index) => (
        <button
          type="button"
          key={index}
          className={filter === category ? "active" : ""}
          onClick={() => setFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="gallery-container">
        <h1 className="gallery-heading">Our Training Institute Gallery</h1>
        {renderFilters()}
        <GallerySkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h1 className="gallery-heading">Our Training Institute Gallery</h1>
        {renderFilters()}
        <p className="no-data">{error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">Our Training Institute Gallery</h1>

      {renderFilters()}

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
                  alt={item.name || "Gallery"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300";
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
              alt={lightbox.name || "preview"}
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/700x500";
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