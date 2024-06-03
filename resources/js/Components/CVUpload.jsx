import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const CVUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cv', file);

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/upload-cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful upload and retrieve extracted data (if sent by the server)
      console.log(response.data); // For development purposes, replace with logic to use extracted data
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error uploading CV. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='row'>
        <form onSubmit={handleUpload}>
          <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Upload CV'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default CVUpload;
