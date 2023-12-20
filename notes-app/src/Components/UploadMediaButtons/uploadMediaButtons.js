import React, { memo, useRef } from "react";
import { mediaButtons } from "../../Constants/constant";
import "./uploadMediaButtons.css";

const UploadMediaButtons = ({ handleMediaUpload }) => {
  ///Input refs for image, audio and video inputs
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  const handleIconClick = (inputRef) => {
    inputRef.current.click();
  };

  const handleFileChange = (event, type) => {
    const reader = new FileReader();
    reader.onload = (file) => {
      handleMediaUpload(file.target.result, type);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className="upload-media-btns">
      {mediaButtons.map((mediaButton, index) => (
        <div className="icon-wrapper" key={index}>
          <img
            src={mediaButton.iconPath}
            alt={mediaButton.altText}
            onClick={() => handleIconClick(inputRefs[index])}
          />
          <input
            type="file"
            accept={mediaButton.type}
            style={{ display: "none" }}
            ref={inputRefs[index]}
            onChange={(event) => handleFileChange(event, mediaButton.type)}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(UploadMediaButtons);
