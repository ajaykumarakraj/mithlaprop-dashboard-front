import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Signup Thunk (Send OTP)
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ mobile }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.almonkdigital.in/api/send-login-otp",
        { mobile },
        {
          headers: {
            Authorization:
              "Bearer 83|laravel_sanctum_BwhsYKTMWoJ8qJbL9Ft36vmv7zfQ58n8eq6RwfSWd7c8d5c6",
          },
        }
      );
      if (res.data.status === 200) return res.data;
      return rejectWithValue(res.data.message || "Failed to send OTP");
    } catch (err) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  }
);

// 🔹 OTP Verify Thunk
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.almonkdigital.in/api/verify-login-otp",
        { mobile, otp },
        {
          headers: {
            Authorization:
              "Bearer 83|laravel_sanctum_BwhsYKTMWoJ8qJbL9Ft36vmv7zfQ58n8eq6RwfSWd7c8d5c6",
          },
        }
      );

      if (res.data.status === 200) return res.data;
      return rejectWithValue(res.data.message || "Invalid OTP");
    } catch (err) {
      return rejectWithValue(err.response?.data || "OTP verification failed");
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    message: null,
    otpPopup: false,
    redirect: false,
    loading: false,
    error: null,
  },
  reducers: {
    closeOtpPopup: (state) => {
      state.otpPopup = false;
      state.error = null;
    },
    resetRedirect: (state) => {
      state.redirect = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPopup = true;
        state.message = action.payload.message || "OTP sent successfully ✅";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Your number is not registered";
      })
      // OTP Verify
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.otpPopup = false;
        state.message = action.payload.message || "OTP verified successfully 🎉";
        state.redirect = true;
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed ❌";
      });
  },
});

export const { closeOtpPopup, resetRedirect } = AuthSlice.actions;
export default AuthSlice.reducer;
