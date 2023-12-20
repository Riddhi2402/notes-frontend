import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./createNote.css";
import SaveButton from "../../Components/SaveButton/saveButton";
import UploadMediaButtons from "../../Components/UploadMediaButtons/uploadMediaButtons";
import { createNote, updateNote } from "../../redux/slice/noteSlice";
import { FILE_TYPES } from "../../Constants/constant";

const CreateNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => ({
    ...state.notes,
  }));
  const { state } = useLocation();

  const [newNote, setNewNote] = useState(
    state && state.note
      ? state.note
      : {
          title: "",
          content: [],
          createdAt: new Date(),
        }
  );
  const [textContent, setTextContent] = useState("");

  const handleNoteTitleChange = (event) => {
    setNewNote({ ...newNote, title: event.target.value });
  };

  //Handle exxistent text content changes
  const handleNoteTextChange = (value, index) => {
    if (index || index === 0) {
      const updatedArray = [...newNote.content];
      updatedArray[index] = {
        ...updatedArray[index],
        data: value,
      };
      setNewNote({ ...newNote, content: updatedArray });
    }
  };

  const renderNotesContent = () => {
    return newNote.content.map((item, index) => {
      switch (item.type) {
        case "text":
          return (
            <textarea
              key={index}
              className="create-note-textarea"
              aria-label="text-area-for-text-content"
              placeholder="Start typing..."
              value={item.data}
              onChange={(event) => handleNoteTextChange(event.target.value, index)}
            />
          );
        case FILE_TYPES.IMAGE:
          return (
            <img
              key={index}
              src={item.data}
              alt="image"
              width="320"
              height="240"
              className="align-self-center"
            />
          );
        case FILE_TYPES.AUDIO:
          return (
            <audio
              controls
              src={item.data}
              key={index}
              className="align-self-center"
            />
          );
        case FILE_TYPES.VIDEO:
          return (
            <video
              controls
              src={item.data}
              key={index}
              width="320"
              height="240"
              className="align-self-center"
            />
          );
        default:
          return "";
      }
    });
  };

  //Save changes on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setNewNote({
        ...newNote,
        content: [
          ...newNote.content,
          { type: "text", data: event.target.value },
        ],
      });
      setTextContent("");
    }
  };

  const handleMediaUpload = (value, type) => {
    setNewNote({
      ...newNote,
      content: [...newNote.content, { type: type, data: value }],
    });
  };

  const handleBeforeUnload = () => {
    const confirmNavigation = window.confirm(
      "You have unsaved changes. Do you want to leave and discard the note?"
    );

    if (confirmNavigation) {
      navigate("/");
    }
  };

  //handle save button click
  const handleSave = () => {
    let updatedNote = newNote;
    if (textContent) {
      updatedNote = {
        ...newNote,
        content: [...newNote.content, { type: "text", data: textContent }],
        createdAt: new Date(),
      };
    }
    if (newNote.id) {
      dispatch(updateNote({ updatedNote, navigate }));
    } else {
      dispatch(createNote({ newNote: updatedNote, navigate }));
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <div className="create-note-header">
          <img
            src="/images/arrow-icon.svg"
            alt="arrow-icon"
            onClick={handleBeforeUnload}
          />
          <SaveButton handleSave={handleSave} loading={loading} />
        </div>
        <div className="text-fields">
          <textarea
            className="title-text-area"
            aria-label="text-area-for-title"
            placeholder="Title"
            value={newNote.title}
            onChange={handleNoteTitleChange}
          />
          {renderNotesContent()}
          <textarea
            className="create-note-textarea"
            aria-label="text-area-for-text-content"
            placeholder="Start typing..."
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <UploadMediaButtons handleMediaUpload={handleMediaUpload} />
    </div>
  );
};

export default CreateNote;
