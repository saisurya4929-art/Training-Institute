import React from "react";
import "../Styles/Blog.css";

import blog1 from '../assets/Blog1.jpg';
import blog2 from "../assets/Blog 2.jpg";
import blog3 from "../assets/Blog 3.jpg";
import blog4 from '../assets/Blog 4.jpg';

function Blog() {
  return (
    <section className="blog-page">

      <div className="blog-title">
        <h2>Latest Articles & Developer Guides</h2>
        <p>
          Explore modern web development tutorials, career tips and industry
          insights from our expert trainers.
        </p>
      </div>

      <div className="blog-layout">

        <div className="blog-posts">

          <div className="blog-card">
            <div className="blog-image">
              <img src={blog1} alt="" />
              <span className="tag">React</span>
            </div>

            <div className="blog-content">
              <h3>React JS Complete Guide for Beginners</h3>

              <p>
                Learn how to build powerful modern websites using React,
                components, hooks and real industry projects.
              </p>

              <div className="blog-meta">
                <span>Jan 2026</span>
                <button>Read Article</button>
              </div>
            </div>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src={blog2} alt="" />
              <span className="tag">Career</span>
            </div>

            <div className="blog-content">
              <h3>Full Stack Developer Career Roadmap</h3>

              <p>
                Discover the exact skills required to become a full stack
                developer using React, Node JS and modern databases.
              </p>

              <div className="blog-meta">
                <span>Feb 2026</span>
                <button>Read Article</button>
              </div>
            </div>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src={blog3} alt="" />
              <span className="tag">Programming</span>
            </div>

            <div className="blog-content">
              <h3>Top Programming Languages in 2026</h3>

              <p>
                Discover the most powerful programming languages used by
                modern technology companies.
              </p>

              <div className="blog-meta">
                <span>Mar 2026</span>
                <button>Read Article</button>
              </div>
            </div>
          </div>


          <div className="blog-card">
            <div className="blog-image">
              <img src={blog4} alt="" />
              <span className="tag">Placement</span>
            </div>

            <div className="blog-content">
              <h3>How Our Students Get Placed in IT Companies</h3>

              <p>
                Our training includes real projects, interview preparation,
                coding challenges and placement guidance.
              </p>

              <div className="blog-meta">
                <span>Apr 2026</span>
                <button>Read Article</button>
              </div>
            </div>
          </div>

        </div>



        <div className="blog-sidebar">

          <div className="sidebar-box search-box">
            <h4>Search Articles</h4>
            <input type="text" placeholder="Search blog..." />
          </div>


          <div className="sidebar-box">
            <h4>Categories</h4>

            <ul>
              <li>React Development</li>
              <li>Java Full Stack</li>
              <li>Web Development</li>
              <li>Career Guidance</li>
              <li>Placement Training</li>
            </ul>
          </div>


          <div className="sidebar-box">
            <h4>Recent Posts</h4>

            <div className="recent">
              <img src={blog1} alt="" />
              <p>React JS Beginner Guide</p>
            </div>

            <div className="recent">
              <img src={blog2} alt="" />
              <p>Full Stack Developer Roadmap</p>
            </div>

            <div className="recent">
              <img src={blog3} alt="" />
              <p>Top Programming Languages</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Blog;