import React from "react";
import "../Styles/Blog.css";
import blog1 from "../assets/reactimg.jpeg";
import blog2 from "../assets/spring.jpeg";
import blog3 from '../assets/java.jpeg';


const Blog = () => {
  return (
    <div className="blog">

      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>Learning Resources & Career Tips</h1>
          <p>Stay updated with latest technology, career guidance and training insights</p>
          <button className="blog-btn">Explore Articles</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="blog-categories">
        <div className="category">Web Development</div>
        <div className="category">Java & Spring Boot</div>
        <div className="category">React JS</div>
        <div className="category">Interview Tips</div>
        <div className="category">Career Guidance</div>
      </section>

      {/* BLOG CARDS */}
      <section className="blog-grid">
        <div className="blog-card">
          <img src={blog1} alt="Reactblog" />
          <h3>Top React JS Interview Questions</h3>
          <p>Prepare for frontend developer interviews with real examples.</p>
          <button>Read More</button>
        </div>

        <div className="blog-card">
          <img src={blog2} alt="Springboot" />
          <h3>Spring Boot Roadmap 2026</h3>
          <p>Complete backend roadmap for beginners to advanced level.</p>
          <button>Read More</button>
        </div>

        <div className="blog-card">
          <img src={blog3} alt="Fullstack" />
          <h3>How to Become Full Stack Developer</h3>
          <p>Step by step learning path for freshers.</p>
          <button>Read More</button>
        </div>
      </section>

      
    </div>
  );
};

export default Blog;