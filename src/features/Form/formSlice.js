import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
  isDeleting: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    openEdit(state) {
      state.isEditing = true;
    },
    closeEdit(state) {
      state.isEditing = false;
    },
    openDelete(state) {
      state.isDeleting = false;
    },
    close(state) {
      state.isDeleting = false;
    },
  },
});

export const { openEdit, closeEdit, openDelete, closeDelete } =
  formSlice.actions;
export default formSlice.reducer;
