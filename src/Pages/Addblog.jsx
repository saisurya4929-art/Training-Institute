import React, { useState } from "react";
import AdminSidebar from "./Adminsidebar";
import "../Styles/AddBlog.css"

// const AddBlog = () => {

//     const [blog, setBlog] = useState({
//         title: "",
//         category: "",
//         image: "",
//         description: ""
//     });

//     const handleChange = (e) => {
//         setBlog({ ...blog, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log(blog);

//         alert("Blog Added Successfully 🚀");

//     };

//     return (
//         <div className="admin-page">

//             <AdminSidebar />

//             <div className="addblog-container">

//                 {/* BIG HEADER */}
//                 <div className="addblog-header">
//                     <h1>Add New Blog ✍️</h1>
//                     <p>Create blog content for your website</p>
//                 </div>

//                 <div className="addblog-card">

//                     <form onSubmit={handleSubmit}>

//                         <div className="form-group">
//                             <label>Blog Title</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 placeholder="Enter blog title..."
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Category</label>
//                             <input
//                                 type="text"
//                                 name="category"
//                                 placeholder="Example: React, Java..."
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Image URL</label>
//                             <input
//                                 type="text"
//                                 name="image"
//                                 placeholder="Paste image URL..."
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Description</label>
//                             <textarea
//                                 name="description"
//                                 rows="5"
//                                 placeholder="Write blog content..."
//                                 onChange={handleChange}
//                             ></textarea>
//                         </div>

//                         <button className="publish-btn">
//                             Publish Blog 🚀
//                         </button>

//                     </form>

//                 </div>

//             </div>
//         </div>
//     );
// };

// export default AddBlog;
// import React, { useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import "../Styles/AddBlog.css";
import axios from "axios"; // ✅ import axios

const AddBlog = () => {

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    description: ""
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  // ✅ CONNECTED FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/blogs", // ✅ backend URL
        blog
      );

      console.log(res.data);
``
      alert("Blog Added Successfully 🚀");

      // ✅ Clear form after submit
      setBlog({
        title: "",
        category: "",
        image: "",
        description: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error adding blog ❌");
    }
  };

  return (
    <div className="admin-page">

      <AdminSidebar />

      <div className="addblog-container">

        <div className="addblog-header">
          <h1>Add New Blog ✍️</h1>
          <p>Create blog content for your website</p>
        </div>

        <div className="addblog-card">

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Blog Title</label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={blog.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={blog.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                value={blog.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="publish-btn">
              Publish Blog 🚀
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddBlog;
