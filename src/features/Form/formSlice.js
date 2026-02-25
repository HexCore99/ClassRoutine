import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
  isDeleting: false,
  classBlockId: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setId(state, action) {
      state.classBlockId = action.payload;
    },
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

export const { setId, openEdit, closeEdit, openDelete, closeDelete } =
  formSlice.actions;
export const selectClassBlockId = (state) => state.form.classBlockId;
export default formSlice.reducer;
