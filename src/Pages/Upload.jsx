import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../Styles/upload.css";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id;

  
  useEffect(() => {
    if (studentId) {
      fetchFiles();
    }
  }, [studentId]);

  const fetchFiles = async () => {
    try {
      const res = await axiosInstance.get(`/api/upload/${studentId}`);
      setUploadedFiles(res.data || []);
    } catch (error) {
      console.log("Fetch error:", error);
      toast.error("Failed to load files");
    }
  };

  
  const handleUpload = async (e) => {
    const files = e.target.files;

    if (!studentId) {
      toast.error("Session expired. Please login again.");
      return;
    }

    if (!files || files.length === 0) return;

    setLoading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

          await axiosInstance.post(`/api/upload/${studentId}`, formData);
      }

      toast.success("Files uploaded successfully");
      fetchFiles();
    } catch (error) {
      console.log("Upload error:", error);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Upload failed");
      }
    }

    setLoading(false);
    e.target.value = "";
  };

    const deleteFile = async (id) => {
    try {
      await axiosInstance.delete(`/api/upload/${id}`);
      toast.success("Deleted successfully");
      fetchFiles();
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="upload-wrapper">
      <Sidebar />

      <div className="upload-container">

        
        <div className="upload-header">
          <h2>Upload Center</h2>
          <p>Manage assignments, certificates & documents</p>
        </div>

       
        <div className="upload-card">

          <label className="upload-btn">
            {loading ? "Uploading..." : "Upload Files"}
            <input
              type="file"
              multiple
              onChange={handleUpload}
              hidden
            />
          </label>

          <div className="upload-drop">
            <input type="file" multiple onChange={handleUpload} />
            <h3>Drag & Drop Files</h3>
            <p>or click upload button</p>
          </div>

        </div>


        <div className="upload-stats">
          <div className="stat">
            <h4>{uploadedFiles.length}</h4>
            <p>Total Files</p>
          </div>

          <div className="stat">
            <h4>
              {(
                uploadedFiles.reduce(
                  (total, file) => total + (file.fileSize || 0),
                  0
                ) / (1024 * 1024)
              ).toFixed(2)} MB
            </h4>
            <p>Storage Used</p>
          </div>
        </div>

        <div className="upload-list">
          <h3>Recent Uploads</h3>

          {uploadedFiles.length === 0 ? (
            <p>No files uploaded yet</p>
          ) : (
            uploadedFiles.map((file) => (
              <div className="file-item" key={file.id}>
                <span>{file.fileName}</span>

                <div className="file-actions">
                  <a href={file.fileUrl} target="_blank" rel="noreferrer">
                    View
                  </a>

                  <button
                    className="delete-btn"
                    onClick={() => deleteFile(file.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Upload;