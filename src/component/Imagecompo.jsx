import React, { useState } from "react";

const Imagecompo = () => {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const validImages = files.filter((file) => file.type.startsWith("image/"));
        const newPreviews = validImages.map((file) => URL.createObjectURL(file));

        // ✅ Append new images to existing ones
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        // ✅ Optional: remove a specific image
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="image-upload-container">
            <h2>Upload Your Images</h2>

            <label className="image-upload-box">
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                />
                <div className="upload-text">
                    <p>Click or Drag & Drop to Upload</p>
                    <span>Accepted: .jpg, .png, .jpeg</span>
                </div>
            </label>

            {previews.length > 0 && (
                <div className="image-preview">
                    <h4>All Uploaded Images:</h4>
                    <div className="preview-grid">
                        {previews.map((src, index) => (
                            <div key={index} className="preview-item">
                                <img
                                    src={src}
                                    alt={`Preview ${index}`}
                                    className="preview-image"
                                />
                                <button
                                    className="remove-btn"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button className="upload-btn" disabled={!previews.length}>
                Upload Images
            </button>
        </div>
    );
};

export default Imagecompo;
