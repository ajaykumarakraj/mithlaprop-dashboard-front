import React, { useState } from 'react';
// styles

const VideoUpload = () => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Video</h2>

      <label className="upload-box">
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <div className="upload-message">
          <p>Click or Drag & Drop to Upload</p>
          <span>Accepted: .mp4, .mov, .avi</span>
        </div>
      </label>

      {preview && (
        <div className="video-preview">
          <h4>Preview:</h4>
          <video src={preview} controls width="100%" />
        </div>
      )}

      <button className="upload-btn" disabled>
        Upload Video
      </button>
    </div>
  );
};

export default VideoUpload;
