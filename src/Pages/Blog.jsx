import React, { useEffect, useState } from "react";
import "../Styles/Blog.css";
import axiosInstance from "../utils/axiosInstance";
import BlogSkeleton from "../components/BlogSkeleton";
import ErrorBoundary from "../components/ErrorBoundary";

const setCache = (key, data) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({
      data,
      expiry: Date.now() + 5 * 60 * 1000,
    })
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

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const cachedBlogs = getCache("blogCache");

    if (cachedBlogs) {
      setBlogs(cachedBlogs);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axiosInstance.get("/api/blogs");

      console.log("API DATA", res.data);

      const blogData = Array.isArray(res.data) ? res.data : [];

      setBlogs(blogData);
      setCache("blogCache", blogData);
    } catch (error) {
      console.log("Blog fetch error:", error);
      setError(error.response?.data || "Failed to load blog data.");
    } finally {
      setLoading(false);
    }
  };

  const renderHero = () => (
    <section className="blog-hero">
      <div className="blog-hero-content">
        <h1>Learning Resources & Career Tips</h1>
        <p>Latest blogs from admin dashboard</p>
        <button className="blog-btn">Explore Articles</button>
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="blog">
        {renderHero()}

        <section className="blog-grid">
          <BlogSkeleton />
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog">
        {renderHero()}

        <section className="blog-grid">
          <p className="no-data">{error}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="blog">
      {renderHero()}

      <section className="blog-grid">
        <ErrorBoundary>
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div className="blog-card" key={blog.id || index}>
                <img
                  src={blog.image}
                  alt={blog.title || "blog"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x250";
                  }}
                />

                <h3>{blog.title}</h3>

                <p>{blog.description}</p>

                <span className="category">{blog.category}</span>

                <button type="button">Read More</button>
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