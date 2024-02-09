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
      <h1>Analysis Result</h1>
      {data ? renderJsonData(data) : 'No data to display'}
    </div>
  );
}

export default DataDisplayPage;