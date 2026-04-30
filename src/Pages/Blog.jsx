import React from "react";
import "../Styles/Blog.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogSkeleton from "../components/BlogSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/blogs")
      .then((res) => {
        console.log("API DATA", res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to load blog data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
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
          <BlogSkeleton />
        </section>
      </div>
    );
  }

  if (error) {
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
          <p className="no-data">{error}</p>
        </section>
      </div>
    );
  }

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
        <ErrorBoundary>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div className="blog-card" key={blog.id || index}>
                <img
                  src={blog.image}
                  alt="blog"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x250";
                  }}
                />

                <h3>{blog.title}</h3>

                <p>{blog.description}</p>

                <span className="category">{blog.category}</span>

                <button>Read More</button>
              </div>
            ))
          ) : (
            <p className="no-data">No blogs found</p>
          )}
        </ErrorBoundary>
      </section>
    </div>
  );
};

export default Blog;