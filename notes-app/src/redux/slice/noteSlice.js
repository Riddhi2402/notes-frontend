import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL_BASE_PATH } from "../../Constants/constant";

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ({ newNote, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL_BASE_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async ({}, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL_BASE_PATH);
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ updatedNote, navigate }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_BASE_PATH}/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState: { loading: false, notes: [], error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
    });
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotes.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.notes = payload;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
    });
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action;
    });
  },
});

export const {} = noteSlice.actions;
export default noteSlice.reducer;
