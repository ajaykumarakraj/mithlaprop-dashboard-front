import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 SEND OTP (Signup)
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ phone, name, city, userType }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.squarebigha.com/api/signup",
        { phone, name, city, userType }
      );

      // API success check
      if (res.data?.status === 200 || res.data?.success === true) {
        console.log(res.data)
        return res.data;
      }

      return rejectWithValue(res.data?.message || "Failed to send OTP");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// 🔹 VERIFY OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ type, phone, otp, user_type, name, city }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.squarebigha.com/api/verify-otp",
        { type, phone, otp, user_type, name, city }
      );

      if (res.data?.status === 200 || res.data?.success === true) {
        return res.data;
      }

      return rejectWithValue(res.data?.message || "Invalid OTP");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "OTP verification failed");
    }
  }
);

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: null,
    redirect: false,
    otpSent: false,
  },
  reducers: {
    resetRedirect: (state) => {
      state.redirect = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 SIGNUP (Send OTP)
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP Sent Successfully";
        state.otpSent = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Signup failed";
      })

      // 🔹 VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.message = action.payload?.message || "OTP Verified";
        state.redirect = true;
        state.otpSent = false;

        if (action.payload?.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid OTP";
      });
  },
});

export const { resetRedirect, clearMessage } = AuthSlice.actions;
export default AuthSlice.reducer;
