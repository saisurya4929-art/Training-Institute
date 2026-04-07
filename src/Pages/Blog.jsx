import React from "react";
import "../Styles/Blog.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/blogs")
      .then((res) => {
        console.log("API DATA",res.data);
        setBlogs(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="blog">

      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1>Learning Resources & Career Tips</h1>
          <p>Latest blogs from admin dashboard</p>
          <button className="blog-btn">Explore Articles</button>
        </div>
      </section>

      <section className="blog-grid">

        {blogs.map((blog, index) => (
          <div className="blog-card" key={index}>
            <img src={blog.image} alt="blog" />

            <h3>{blog.title}</h3>

            <p>{blog.description}</p>

            <span className="category">{blog.category}</span>

            <button>Read More</button>

          </div>
        ))}

      </section>

    </div>
  );
};

export default Blog;