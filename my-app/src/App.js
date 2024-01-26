import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [page, setPage] = useState('upload'); // 'upload', 'loading', 'dataDisplay', 'preview'

  // handles input changes and files dropped
  const handleFileChange = (event) => {
    const file = event.target.files ? event.target.files[0] : event;
    if (file && file.type == "application/pdf") {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPage('preview'); // change to preview state
    } else {
      // reset if not PDF
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }
    setPage('loading');
    // Simulate PDF processing delay
    setTimeout(() => {
      // clean up the object URL
      URL.revokeObjectURL(previewUrl);
      setPage('dataDisplay');
    }, 3000); // 3 seconds delay
  }

  if (page == 'loading') {
    return <div className="loading-screen">Loading...</div>;
  }

  const handleDragOver = (event) => {
    event.preventDefault(); // prevent default behaviour
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // access the file
    handleFileChange(file);
  }

  if (page === 'dataDisplay') {
    return (
      <div className="data-display-page">
        Dataframes will show here
      </div>
    );
  }

  // preview page
  if (page === 'preview') {
    return (
      <div className="upload-page">
        <div className="pdf-preview-container">
          {previewUrl && (
            <object className="pdf-preview" data={previewUrl} type="application/pdf">
              <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={previewUrl}>Download PDF</a>.</p>
            </object>
          )}
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }

  // Default to upload page
  return (
    <div className={`upload-page ${page === 'preview' ? 'row-layout' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      {page === 'upload' && (
        <>
          <label className="file-input-label">
            <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
            Select PDF file
          </label>
          <div className="drop-text">or drop PDF here</div>
        </>
      )}
      {page === 'preview' && (
        <>
          <div className="pdf-preview-container">
            {previewUrl && (
              <object className="pdf-preview" data={previewUrl} type="application/pdf">
                <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={previewUrl}>Download PDF</a>.</p>
              </object>
            )}
          </div>
          <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
