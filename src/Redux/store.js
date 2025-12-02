import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import loginReducer from "./slices/LoginSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        authlogin: loginReducer
    },
});
