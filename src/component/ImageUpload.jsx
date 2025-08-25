import React, { useState } from 'react';
// import './ImageUpload.css';

const ImageUpload = () => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="image-upload-container">
            <h2>Upload Your Image</h2>

            <label className="image-upload-box">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <div className="upload-text">
                    <p>Click or Drag & Drop to Upload</p>
                    <span>Accepted: .jpg, .png, .jpeg</span>
                </div>
            </label>

            {preview && (
                <div className="image-preview">
                    <h4>Preview:</h4>
                    <img src={preview} alt="Preview" />
                </div>
            )}

            <button className="upload-btn" disabled>
                Upload Image
            </button>
        </div>
    );
};

export default ImageUpload;
