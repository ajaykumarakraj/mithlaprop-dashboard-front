import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
// import propertyReducer from "./slices/PropertySlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        // property: propertyReducer
    },
});
