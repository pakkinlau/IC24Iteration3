import React, { useEffect } from 'react';
import { useData } from './DataContext'; 

function DataDisplayPage() {
  const { data, fetchData } = useData();

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, [fetchData]); // Ensure fetchData doesn't change on every render

  // Function to render JSON data
  const renderJsonData = (jsonData) => {
    return <pre>{JSON.stringify(jsonData, null, 2)}</pre>; // Pretty print JSON
  };

  return (
    <div className="data-display-page">
      <div class="data-display-header">Analysis Result</div>
      <div class="data-display-container">
        {data ? renderJsonData(data) : 'No data to display'}
      </div>
    </div>
  );
}

export default DataDisplayPage;