import React, { useState } from 'react';

function UploadPage({ searchTerm, handleFileChange, handleSearchChange, renderRecentFiles, handleDragOver }) {
  // State to manage upload status and response data
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadData, setUploadData] = useState(null);

  // Function to upload file
  const uploadFile = (file) => {
    const url = 'http://127.0.0.1:5000/analyze';
    const formData = new FormData();
    formData.append('document', file);

    fetch(url, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setUploadStatus('Upload successful');
      setUploadData(data);
      // Here you could potentially update a global state or context with the data
    })
    .catch((error) => {
      console.error('Error:', error);
      setUploadStatus('Upload failed');
    });
  };

  return (
    <div className="upload-page" onDragOver={handleDragOver} onDrop={handleFileChange}>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search file here..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="recent-files-container">
        {renderRecentFiles()}
      </div>
      <div className="centered-content">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" className="file-input-label">Select PDF file</label>
        <div className="drop-text">or drop PDF here</div>
      </div>
      {/* Display upload status */}
      {uploadStatus && <p>{uploadStatus}</p>}
      {/* Optionally render uploaded data */}
      {uploadData && <div><pre>{JSON.stringify(uploadData, null, 2)}</pre></div>}
      {/* Footer */}
      <footer className="availability-container">
        <span>We're also available on:</span>
        <span>Mobile</span>
        <span>Desktop</span>
        <span>Chrome</span>
      </footer>
    </div>
  );
}

export { uploadFile }; // Exporting the uploadFile function

export default UploadPage;
