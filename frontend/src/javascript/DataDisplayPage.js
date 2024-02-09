import React from 'react';

function DataDisplayPage({ data, uploadStatus }) {
  // Function to render JSON data or status
  const renderContent = () => {
    if (uploadStatus) return <p>{uploadStatus}</p>;
    
    // Check if data needs parsing
    console.log("Data received:", data);
    if (data && data.length > 0) {
      try {
        // Assuming data[0] is a JSON string; parse it
        const parsedData = JSON.parse(data[0]);
        return <pre>{JSON.stringify(parsedData, null, 2)}</pre>;
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        return <p>Error displaying data</p>;
      }
    }

    return <p>No data to display</p>;
  };

  return (
    <div className="data-display-page">
      <h1 className="data-display-header">Analysis Result</h1>
      <div className="data-display-container">{renderContent()}</div>
    </div>
  );
}

export default DataDisplayPage;
