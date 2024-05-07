// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import ImageDisplay from "./ImageDisplay.jsx";

const Image =  () =>{

    const [file, setFile] = useState(null);
    const [uploadedImageId, setUploadedImageId] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post('http://localhost:8080/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Handle the response as needed
            setUploadedImageId(response.data?.imageName); // Assuming the backend returns the saved image ID
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {uploadedImageId && <p>Image uploaded with ID: {uploadedImageId}</p>}
            <br/>
            <ImageDisplay imageId={uploadedImageId}/>
        </div>
    );

}

export default Image;