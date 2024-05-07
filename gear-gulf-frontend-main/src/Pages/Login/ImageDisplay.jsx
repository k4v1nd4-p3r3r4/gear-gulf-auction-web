import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getImage} from "../../services/ApiService.js";

const ImageDisplay = ({ imageId }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const res = await getImage(imageId)
            setImageUrl(res)
        };

        if (imageId) {
            fetchImage();
        }
    }, [imageId]);

    return (
        <div>
            {imageUrl && (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageDisplay;