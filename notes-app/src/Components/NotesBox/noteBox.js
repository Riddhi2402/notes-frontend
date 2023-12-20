import React, { memo } from "react";
import "./noteBox.css";
import { formatDate } from "../../Constants/helpers";
import { useNavigate } from "react-router-dom";

const NoteBox = ({ note }) => {
  const navigate = useNavigate();
  return (
    <div
      className="notes-box"
      onClick={() => navigate(`/edit-note/${note.id}`, { state: { note } })}
    >
      <div className="note-title font-black font-weight-500">{note.title}</div>
      <div className="note-description font-black font-weight-400">
        {note.content[0]?.data}
      </div>
      <div className="note-timestamp font-light-gray font-weight-500">
        {formatDate(note.createdAt)}
      </div>
    </div>
  );
};

export default memo(NoteBox);
