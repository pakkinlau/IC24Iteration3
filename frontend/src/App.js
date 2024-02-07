import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [page, setPage] = useState('upload'); // 'upload', 'loading', 'dataDisplay', 'preview'
  const [searchTerm, setSearchTerm] = useState(' ');
  const [recentFiles, setRecentFiles] = useState([]);

  // handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    // load recent files from localStorage when the component mounts
    const storedFiles = localStorage.getItem('recentFiles');
    if (storedFiles) {
      setRecentFiles(JSON.parse(storedFiles));
    }
  }, []);

  // function to render recent files based on the search term
  const renderRecentFiles = () => {
    return recentFiles
      .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((file, index) => (
        <div key={index} className="recent-file-item">
          <a href={file.url} target="_blank">{file.name}</a>
        </div>
      ));
  };  

  // after a file is selected or uploaded, update the recent files list
  const updateRecentFiles = (newFile) => {
    // You could also check if the file already exists in the list to avoid duplicates
    setRecentFiles(prevFiles => [newFile, ...prevFiles].slice(0, 5)); // Keep only the last 5 files for example
    // Optionally save to localStorage
    localStorage.setItem('recentFiles', JSON.stringify([newFile, ...recentFiles].slice(0, 5)));
  };

  // handles input changes and files dropped
  const handleFileChange = (event) => {
    let file = event.target.files ? event.target.files[0] : event;

    // If the event object has a 'type' property, it is a file from the drop event
    if (!file.type) {
      file = event;
    }

    if (file && file.type == "application/pdf") {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPage('preview'); // change to preview state
      updateRecentFiles({ name: file.name, url: url });
    } else {
      // reset if not PDF
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  // handle submit button
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }
    setPage('loading');
    updateRecentFiles({ name: selectedFile.name, url: previewUrl }); // update recent file
    setTimeout(() => { // simulate PDF processing delay
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
      <div className="preview-page">
        <div className="pdf-preview-container">
          {previewUrl && (
            <object className="pdf-preview" data={previewUrl} type="application/pdf">
              <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={previewUrl}>Download PDF</a>.</p>
            </object>
          )}
        </div>
        <div className="submit-button-container">
          <button className="submit-button" onClick={handleSubmit}>Submit PDF</button>
        </div>
      </div>
    );
  }

  // Default to upload page
  return (
    <div className={`upload-page ${page === 'preview' ? 'row-layout' : ''}`} onDragOver={handleDragOver} onDrop={handleDrop}>
      {/* Search bar at the top */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search recent files..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Recent files list, possibly hidden or styled differently */}
      <div className="recent-files-container">
        {renderRecentFiles()}
      </div>
      
      {/* Centered content for upload or preview */}
      <div className="centered-content">
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

export default App;
