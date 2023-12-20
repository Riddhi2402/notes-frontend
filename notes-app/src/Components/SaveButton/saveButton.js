import React, { memo } from "react";
import "./saveButton.css";

const SaveButton = ({ handleSave, loading }) => {
  return (
    <button
      className={`save-btn font-blue font-14`}
      onClick={handleSave}
      disabled={loading}
    >
      Save
    </button>
  );
};

export default memo(SaveButton);
