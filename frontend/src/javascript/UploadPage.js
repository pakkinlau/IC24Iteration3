import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import at the top

function UploadPage({ onFileChange, searchTerm, handleSearchChange, renderRecentFiles, handleDragOver, handleDrop }) {
  let navigate = useNavigate(); // Initialize navigate function

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
      // Navigate to DataDisplayPage with the fetched data
      navigate('/data-display', { state: { data: data } });
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error case
      // Optionally navigate to an error page or display an error message
    });
  };
  // Modify the onFileChange function to call uploadFile
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
    if (onFileChange) {
      onFileChange(event); // Call the original onFileChange if it exists
    }
  };

  // Modify the handleDrop function to call uploadFile
  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
    if (handleDrop) {
      handleDrop(event); // Call the original handleDrop if it exists
    }
  };

  return (
    <div className="upload-page" onDragOver={handleDragOver} onDrop={handleFileDrop}>
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
        <label className="file-input-label">
          <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
          Select PDF file
        </label>
        <div className="drop-text">or drop PDF here</div>
      </div>
      {/* Footer at the bottom */}
      <footer className="availability-container">
        <span>We're also available on:</span>
        <span>Mobile</span>
        <span>Desktop</span>
        <span>Chrome</span>
      </footer>
    </div>
  );
}

export default UploadPage;