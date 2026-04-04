
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Styles/upload.css";

const Upload = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    setFiles([...files, ...uploaded]);
  };

  return (
    <div className="upload-wrapper">
      <Sidebar />

      <div className="upload-container">

        {/* Background Shapes */}
        <div className="bg-shape one"></div>
        <div className="bg-shape two"></div>
        <div className="bg-shape three"></div>

        {/* Header */}
        <div className="upload-header">
          <h2>Upload Center</h2>
          <p>Manage assignments, certificates & documents</p>
        </div>

        {/* Upload Card */}
        <div className="upload-card">

          <label className="upload-btn">
            Upload Files
            <input type="file" multiple onChange={handleUpload}/>
          </label>

          <div className="upload-drop">
            <input type="file" multiple onChange={handleUpload}/>
            <h3>Drag & Drop Files</h3>
            <p>or click upload button</p>
          </div>

        </div>

        {/* Stats */}
        <div className="upload-stats">
          <div className="stat">
            <h4>{files.length}</h4>
            <p>Total Files</p>
          </div>

          <div className="stat">
            <h4>12</h4>
            <p>Assignments</p>
          </div>

          <div className="stat">
            <h4>5</h4>
            <p>Certificates</p>
          </div>

          <div className="stat">
            <h4>32MB</h4>
            <p>Storage</p>
          </div>
        </div>

        {/* Files */}
        <div className="upload-list">
          <h3>Recent Uploads</h3>

          {files.map((file,index)=>(
            <div className="file-item" key={index}>
              <span>{file.name}</span>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Upload;