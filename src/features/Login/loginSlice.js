import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  status: "idle",
  err: "",
  user: null,
  authChecked: false, //why it's exists
};

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return rejectWithValue(data.message);
    return data.user;
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthSession(state, action) {
      state.user = action.payload?.user ?? null;
      state.authChecked = true;
    },

    clearAuthSession(state) {
      state.user = null;
      state.authChecked = true;
      state.email = "";
      state.status = "idle";
      state.err = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.err = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeded";
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.err = action.payload || action.error.message;
        state.authChecked = true;
      });
  },
});

export const selectLoginUser = (state) => state.login.user;
export const selectEmailAddress = (state) => state.login.email;
export const selectLogin = (state) => state.login;
export const selectAuthChecked = (state) => state.login.authChecked;
export const selectIsAuthenticated = (state) => Boolean(state.login.user);
export const { setAuthSession, clearAuthSession } = loginSlice.actions;
export default loginSlice.reducer;
