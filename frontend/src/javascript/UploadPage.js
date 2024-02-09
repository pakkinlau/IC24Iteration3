import React from 'react';

function UploadPage({ onFileChange, searchTerm, handleSearchChange, handleDrop, renderRecentFiles, handleDragOver, uploadStatus, uploadData }) {
  const hasRecentFiles = renderRecentFiles().length > 0;

  return (
    <div className="upload-page" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search file here..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="centered-content">
        <label className="file-input-label">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={onFileChange} 
            style={{ display: 'none' }} 
          />
          Select PDF file
        </label>
        <div className="drop-text">or drop PDF here</div>
      </div>
      <div className="recent-files-header">Recent files</div>
      <div className="recent-files-container">
        {hasRecentFiles ? renderRecentFiles() : <p>No files yet.</p>}
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

export default UploadPage;
