import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Styles/Gallery.css";
import classroom1 from "../assets/gallimg2.png";
import students1 from "../assets/gallimg7.jpeg";
import lab1 from "../assets/gallimg4.jpeg";
import event1 from "../assets/gallimg5.jpeg";
import classroom2 from "../assets/gallimg3.jpeg";
import students2 from "../assets/gallimg8.jpeg";
import event2 from "../assets/gallimg6.jpeg";
import lab2 from "../assets/gallimg1.jpeg";

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const galleryData = [
    {
      category: "Classroom",
      img: classroom1,
      title: "Smart Classroom",
    },
    {
      category: "Students",
      img: students1,
      title: "Student Collaboration",
    },
    {
      category: "Lab",
      img: lab1,
      title: "Coding Lab",
    },
    {
      category: "Events",
      img: event1,
      title: "Workshop Event",
    },
    {
      category: "Classroom",
      img: classroom2,
      title: "Interactive Training",
    },
    {
      category: "Students",
      img: students2,
      title: "Student Success",
    },
    {
      category: "Events",
      img: event2,
      title: "Seminar Session",
    },
    {
      category: "Lab",
      img: lab2,
      title: "Development Lab",
    },
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
        {filteredImages.map((item, index) => (
          <div
            className="gallery-card"
            key={index}
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