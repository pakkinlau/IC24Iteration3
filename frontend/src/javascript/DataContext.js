import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  // Accept a file parameter
  const fetchData = async (file) => {
    // Use FormData to prepare the file for uploading
    const formData = new FormData();
    formData.append('document', file); // Make sure 'document' matches the name expected by your Flask endpoint

    try {
      const response = await fetch('https://v3pymod.victoriousbush-5ac20e57.southeastasia.azurecontainerapps.io/analyze', {
        method: 'POST',
        body: formData, // Use formData as the request body
        // Don't set Content-Type header; let the browser set it
      });
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        // Handle server errors or invalid responses
        console.error('Server error:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
