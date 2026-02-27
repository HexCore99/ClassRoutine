import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
  isDeleting: false,
  classBlockId: null,
  mode: "edit",
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
      state.mode = "edit";
    },
    closeEdit(state) {
      state.isEditing = false;
      // state.mode = null; //do i need to set it null?
    },
    openDelete(state) {
      state.isDeleting = true;
    },
    close(state) {
      state.isDeleting = false;
    },

    openAdd(state, action) {
      state.isEditing = true;
      state.mode = "add";
      state.classBlockId = null;
    },
    resetForm(state) {
      state.isEditing = false;
      state.classBlockId = null;
      state.mode = "edit";
    },
  },
});

export const {
  setId,
  openEdit,
  closeEdit,
  openDelete,
  closeDelete,
  openAdd,
  resetForm,
} = formSlice.actions;
export const selectClassBlockId = (state) => state.form.classBlockId;
export const selectMode = (state) => state.form.mode;
export default formSlice.reducer;
