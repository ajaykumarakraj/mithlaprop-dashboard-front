import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




//sent otp (login)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ phone }, { rejectWithValue }) => {
        try {
            const res = await axios.post("https://api.squarebigha.com/api/send-login-otp",
                { phone }
            );
            if (res.data.status == 200) {
                console.log(res.data)
                return res.data
            }
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Signup failed");
        }

    }
)

// 🔹 VERIFY OTP
export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ type, phone, otp }, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "https://api.squarebigha.com/api/verify-otp",
                { type, phone, otp }
            );

            if (res.data?.status === 200 || res.data?.success === true) {
                // console.log(res.data)
                return res.data;
            }

            return rejectWithValue(res.data?.message || "Invalid OTP");
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "OTP verification failed");
        }
    }
);

const LoginSlice = createSlice({
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message || "OTP Sent Successfully";
                state.otpSent = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
            })

            // 🔹 VERIFY OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;

                const token = action.payload?.token;
                const data = action.payload?.data;
                const message = action.payload?.message || "OTP Verified";

                // Set Redux State
                state.user = data || null;
                state.message = message;
                state.redirect = true;
                state.otpSent = false;

                // 🟢 SAVE EVERYTHING IN ONE OBJECT (Easy to Use)
                if (token && data) {
                    const saveObj = {
                        token,
                        ...data    // city, name, phone, user_id
                    };

                    localStorage.setItem("user", JSON.stringify(saveObj));
                }
            })

            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Invalid OTP";
            });
    }
})
export const { resetRedirect, clearMessage } = LoginSlice.actions;
export default LoginSlice.reducer