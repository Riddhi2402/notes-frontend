import { configureStore } from "@reduxjs/toolkit";
import NoteReducer from "./slice/noteSlice";

export default configureStore({
  reducer: {
    notes: NoteReducer,
  },
});
