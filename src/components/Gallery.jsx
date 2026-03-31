import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/Gallery.css";
const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const galleryData = [
    {
      id: 1,
      category: "Classroom",
      img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232",
      title: "Smart Classroom"
    },
    {
      id: 2,
      category: "Students",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      title: "Student Collaboration"
    },
    {
      id: 3,
      category: "Lab",
      img: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
      title: "Coding Lab"
    },
    {
      id: 4,
      category: "Events",
      img: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
      title: "Workshop Event"
    },
    {
      id: 5,
      category: "Classroom",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      title: "Interactive Training"
    },
    {
      id: 6,
      category: "Students",
      img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94",
      title: "Student Success"
    },
    {
      id: 7,
      category: "Events",
      img: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      title: "Seminar Session"
    },
    {
      id: 8,
      category: "Lab",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      title: "Development Lab"
    }
  ];

  const categories = ["All", "Classroom", "Students", "Lab", "Events"];

  const filteredImages =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <div className="gallery-container">
      <h1 className="gallery-heading">Our Training Institute Gallery</h1>

      {/* Filter Buttons */}
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

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredImages.map((item) => (
          <div
            className="gallery-card"
            key={item.id}
            onClick={() => setLightbox(item)}
          >
            <img src={item.img} alt={item.title} />
            <div className="gallery-overlay">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox.img} alt="preview" />
          <span className="close-btn">×</span>
        </div>
      )}
    </div>
  );
};

export default Gallery;