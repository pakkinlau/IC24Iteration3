import React, { useState, useEffect } from 'react';
import './App.css';
import UploadPage from './javascript/UploadPage';
import LoadingPage from './javascript/LoadingPage';
import PreviewPage from './javascript/PreviewPage';
import DataDisplayPage from './javascript/DataDisplayPage';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [page, setPage] = useState('upload'); // 'upload', 'loading', 'dataDisplay', 'preview'
  const [searchTerm, setSearchTerm] = useState(' ');
  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    // load recent files from localStorage when the component mounts
    const storedFiles = localStorage.getItem('recentFiles');
    if (storedFiles) {
      setRecentFiles(JSON.parse(storedFiles));
    }
  }, []);

  // handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  // after a file is selected or uploaded, update the recent files list
  const updateRecentFiles = (newFile) => {
    // You could also check if the file already exists in the list to avoid duplicates
    setRecentFiles(prevFiles => [newFile, ...prevFiles].slice(0, 5)); // Keep only the last 5 files for example
    // Optionally save to localStorage
    localStorage.setItem('recentFiles', JSON.stringify([newFile, ...recentFiles].slice(0, 5)));
  };

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

  const handleDragOver = (event) => {
    event.preventDefault(); // prevent default behaviour
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // access the file
    handleFileChange(file);
  }

  // Render components based on the page state
  switch (page) {
    case 'upload':
      return (
        <UploadPage
          onFileChange={handleFileChange}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          renderRecentFiles={renderRecentFiles}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
      );
    case 'loading':
      return <LoadingPage />;
    case 'dataDisplay':
      return <DataDisplayPage />;
    case 'preview':
      return (
        <PreviewPage
          previewUrl={previewUrl}
          handleSubmit={handleSubmit}
        />
      );
    default:
      return <div>Page not found</div>;
  }
}

export default App;
