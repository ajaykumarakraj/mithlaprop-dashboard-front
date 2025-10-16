import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Signup Thunk (Send OTP)
export const signupUser = createAsyncThunk(
    "signupUser",
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

            if (res.data.status === 200) {
                console.log(res.data.message)
                return res.data;
            } else {
                return rejectWithValue(res.data.message || "Failed to send OTP");
            }
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

            console.log("API Response:", res.data);

            if (res.data.status === 200) {
                return res.data; // success
            } else {
                return rejectWithValue(res.data.message || "Invalid OTP");
            }
        } catch (err) {
            return rejectWithValue(err.response?.data || "OTP verification failed");
        }
    }
);
// property type api 
// Thunk to fetch property types
// 🔹 Thunk to fetch property types with Bearer Token
export const fetchPropertyTypes = createAsyncThunk(
    "propertyType/fetchPropertyTypes",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                "https://api.squarebigha.com/api/get-property-type",
                {
                    headers: {
                        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g` // ⬅️ shortened for display
                    },
                }
            );

            console.log("get-property-type API response:", res.data);

            if (res.data.status === 200) {
                return res.data.data; // assuming property types are inside `data`
            } else {
                return rejectWithValue(res.data.message || "Failed to fetch property types");
            }
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch property types"
            );
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {

        user: null,
        message: null,
        otpPopup: false,
        redirect: false,

        auth: {
            loading: false,
            error: null,
        },

        propertyType: {
            types: [],
            loading: false,
            error: null,
        },
    }
    ,
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
            // 🔹 Signup
            .addCase(signupUser.pending, (state) => {
                state.auth.loading = true;
                state.auth.error = null;
                state.message = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.auth.loading = false;
                state.otpPopup = true;
                state.message = action.payload.message || "OTP sent successfully ✅";
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.auth.loading = false;
                // state.otpPopup = true;
                state.message = action.payload.message || "Your number is not registered";
            })


            // 🔹 OTP Verify
            .addCase(verifyOtp.pending, (state) => {
                state.auth.loading = true;
                state.auth.error = null;
                state.message = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.auth.loading = false;
                state.user = action.payload.user || null;
                state.otpPopup = false;
                state.message = action.payload.message || "OTP verified successfully 🎉";
                state.redirect = true;

                if (action.payload.token) {
                    localStorage.setItem("token", action.payload.token);
                }
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.auth.loading = false;
                state.auth.error = action.payload || "OTP verification failed ❌";
            })

            // 🔹 Property Types
            .addCase(fetchPropertyTypes.pending, (state) => {
                state.propertyType.loading = true;
                state.propertyType.error = null;
            })
            .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
                state.propertyType.loading = false;
                state.propertyType.types = action.payload;
            })
            .addCase(fetchPropertyTypes.rejected, (state, action) => {
                state.propertyType.loading = false;
                state.propertyType.error = action.payload || "Failed to load property types";
            });
    },

});

export const { closeOtpPopup, resetRedirect } = authSlice.actions;
export default authSlice.reducer;
