import React, { memo } from "react";
import "./newButton.css";
import { useNavigate } from "react-router-dom";

const NewButton = ({ showBtnClass }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`new-btn font-white font-14 ${showBtnClass}`}
      onClick={() => navigate("/create-note")}
    >
      + NEW
    </button>
  );
};

export default memo(NewButton);
