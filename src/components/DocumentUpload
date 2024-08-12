// src/components/DocumentUpload.js
import React, { useState } from 'react';

const DocumentUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
    onFileUpload(uploadedFiles);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleChange}
        style={{ marginBottom: '10px' }}
      />
      {files.length > 0 && (
        <div>
          <h4>Uploaded Files:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
