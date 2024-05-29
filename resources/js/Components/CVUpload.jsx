
// src/components/CVUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const CVUpload = () => {
    const [file, setFile] = useState(null);
    const [details, setDetails] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('cv', file);

        try {
            const response = await axios.post('/upload-cv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setDetails(response.data);
            console.log(details)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload CV</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {details && (
                <div>
                    <h3>Extracted Details</h3>
                    <pre>{JSON.stringify(details, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default CVUpload;
