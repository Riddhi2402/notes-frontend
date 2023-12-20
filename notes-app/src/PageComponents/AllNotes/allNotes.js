import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./allNotes.css";
import NewButton from "../../Components/NewButton/newButton";
import NoteBox from "../../Components/NotesBox/noteBox";
import { getNotes } from "../../redux/slice/noteSlice";

const AllNotes = () => {
  const dispatch = useDispatch();

  const { loading, notes } = useSelector((state) => ({
    ...state.notes,
  }));

  useEffect(() => {
    dispatch(getNotes({}));
  }, []);

  return (
    <div
      className="all-notes-container"
      // style={{ minHeight: `${window.innerHeight}px` }}
    >
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : (
        <>
          <div className="all-notes-header">
            <span className="notes-header-text font-black font-weight-500">
              Notes
            </span>
            <NewButton showBtnClass="new-btn-desktop" />
          </div>
          <div className="notes-list">
            {notes.map((note) => (
              <NoteBox note={note} key={note.id} />
            ))}
          </div>
          <NewButton showBtnClass="new-btn-mobile" />
        </>
      )}
    </div>
  );
};

export default AllNotes;
