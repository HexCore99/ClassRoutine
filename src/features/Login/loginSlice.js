import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";

const initialState = {
  fullName: "",
  email: "",
  step: "credentials",
  status: "idle",
  verifyStatus: "idle",
  err: "",
};

export const sendVerificationCode = createAsyncThunk(
  "login/sendVerificationCode",
  async ({ fullName, email }, { rejectWithValue }) => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanName) return rejectWithValue("Full name is required");

    if (!cleanEmail) return rejectWithValue("Email is required");

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: {
        shouldCreateUser: true,
        data: { full_name: cleanName },
      },
    });

    if (error) return rejectWithValue(error.message);
    return { fullName: cleanName, email: cleanEmail };
  },
);

export const verifyEmailCode = createAsyncThunk(
  "login/verifyEmailCode",
  async ({ otp }, { getState, rejectWithValue }) => {
    const { email, fullName } = getState().login;
    const token = otp.trim();
    if (!token) return rejectWithValue("Verification code is required");
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) return rejectWithValue(error.message);
    const userId = data.user?.id;
    if (!userId) return rejectWithValue("No user id after verification");

    const { error: profileError } = await supabase.from("users").upsert(
      {
        id: userId,
        email,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (profileError) return rejectWithValue(profileError.message);
    return { userId };
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        ((state.status = "loading"), (state.err = null));
      })
      .addCase(sendVerificationCode.fulfilled, (state, action) => {
        state.status = "succeded";
        state.step = "verification";
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        ((state.status = "failed"),
          (state.err = action.payload || action.error.message));
      })
      .addCase(verifyEmailCode.pending, (state) => {
        state.verifyStatus = "loading";
        state.err = null;
      })
      .addCase(verifyEmailCode.fulfilled, (state, action) => {
        state.verifyStatus = "succeded";
        state.step = "done";
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.verifyStatus = "failed";
        state.err = action.payload || action.error.message;
      });
  },
});

export const currState = (state) => state.login.step;
export const selectEmailAddress = (state) => state.login.email;
export const selectLogin = (state) => state.login;
export default loginSlice.reducer;
