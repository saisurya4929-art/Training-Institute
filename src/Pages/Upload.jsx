import "../Styles/Upload.css";
import React from "react";
import Sidebar from "../components/Sidebar";

const UploadDocs = () => {
  return (
    <div className="page">
      <Sidebar />

      <div className="content">
        <h2>Upload Documents</h2>
       <div className="uploadbox">

       
        <input type="file" />
        <button>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDocs;