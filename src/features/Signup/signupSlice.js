import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "",
  err: "",
};

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    const result = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await result.json();
    if (!result.ok) return rejectWithValue(data.message);
    return data.user;
  },
);

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.state = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.state = "succeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.state = "failed";
        state.err = action.payload || action.error.message;
      });
  },
});
export const selectSignedUp = (state) => state.signup; //what does it return?

export default signupSlice.reducer;
