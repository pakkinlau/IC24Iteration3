import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation if you're using React Router v5 or v6

function DataDisplayPage() {
  const location = useLocation(); // Access location if using React Router
  const data = location.state?.data; // Get data passed through location state

  // Function to render JSON data
  const renderJsonData = (jsonData) => {
    return (
      <pre>
        {JSON.stringify(jsonData, null, 2)} // Pretty print JSON
      </pre>
    );
  };

  return (
    <div className="data-display-page">
      <h1>Analysis Result</h1>
      {data ? renderJsonData(data) : 'No data to display'}
    </div>
  );
}

export default DataDisplayPage;