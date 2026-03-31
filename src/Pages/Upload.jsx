
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";

function Upload() {

  const [file, setFile] = useState(null);

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios.post("http://localhost:8080/api/upload", formData)
      .then(() => alert("Uploaded"));
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="main">
        

        <h2>Upload Document</h2>

        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload</button>

      </div>

    </div>
  );
}

export default Upload;