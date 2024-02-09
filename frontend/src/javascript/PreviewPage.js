import React from 'react';

function PreviewPage({ previewUrl, handleSubmit }) {
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

export default PreviewPage;
