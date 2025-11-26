// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import api from "../../component/Baseurl";
// // 🔹 Thunk to fetch property types
// export const fetchPropertyTypes = createAsyncThunk(
//     "property/fetchPropertyTypes",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await api.get(
//                 "/api/get-property-type",
//                 {
//                     headers: {
//                         Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwMTk5MjgxNi1kZDUxLTcyMDEtYWY5MC1iNTZiYmNiMGVmNDEiLCJqdGkiOiIzOTUzMTUxNjQyOWM1MzZiZmM1NjQyOTQ2ODNhYTYxNzc0NTgxZjRmZmU4NjE5NzNiZWQ0Mjk1OTdlYzQzZjM5NTk5ZDQ0Yjc4MjgyNWMxMyIsImlhdCI6MTc1NzQxNzk0Ni45Mjk3NzEsIm5iZiI6MTc1NzQxNzk0Ni45Mjk3NzMsImV4cCI6MTc4ODk1Mzk0Ni45MjQ1OTUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.qL6E9AzHFXC74-XRr0-KhAao4jWisTvyeri3eUXTEFV_Hp6DTylDISB1eeDsyaStrMIfk89EjMVaClE16WbYBKGVpHSnKOaDT56ubfb7DcrHAh50BTLTTIgYyf_Gbop_pnHFkOjbFc03SgKLWHJ8PpQlShiIxtXBA2eQX5bEkYHit0eZYN0bQdjtiu8YFvhubG9OMee-r95Cc8nXRdiC3gkXw0POWjwoCev9BNFHZ8UfdgXZMjxDVo4R_fFdWTeeicFjchFxYuRb7zm1aU8OUFyc4ozNJUC6Wix4hUARjUTmIfZ5mfEq5TDQWD0AM-ERfP8tIkkoTbDqqASU2Mg6LJ4p6nUXUqAuql4sDbmRKVlB04N15xV62LHWJTgT71JfA_bgZHFJGDUQD1c53vCwqEbZUSrMMAOXF6mllBmm1baKdqiocEm9_QldIWT2U07zmYGG4PBU2N3pBmMXftZDFu-xOPBSdB7dsz9KEUeY_gLDoupX9JwgQY8aNT-lwlcb9c0tguDdLWS2cU1LY180kfF0R7QeRq5UpCyb27COT7LNu9R9sl_KMcmLnxtzhNWA-YZeS9h3sKlimso6GO3VgTevyWaVyAs4nCNxP7kAP7FdlG-ckIUEuwsFmvV5pBGu65VB8hG9n3mha-zi7oRlqm4ltkGNLVZR4pX9iBN1Z6g`,
//                     },
//                 }
//             );
//             console.log(res.data.data)
//             if (res.data.status === 200) return res.data.data;
//             return rejectWithValue(res.data.message || "Failed to fetch property types");
//         } catch (err) {
//             return rejectWithValue(
//                 err.response?.data?.message || "Failed to fetch property types"
//             );
//         }
//     }
// );

// const PropertySlice = createSlice({
//     name: "property",
//     initialState: {
//         propertyType: {
//             types: [],
//             loading: false,
//             error: null,
//         },
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPropertyTypes.pending, (state) => {
//                 state.propertyType.loading = true;
//                 state.propertyType.error = null;
//             })
//             .addCase(fetchPropertyTypes.fulfilled, (state, action) => {
//                 state.propertyType.loading = false;
//                 state.propertyType.types = action.payload;
//             })
//             .addCase(fetchPropertyTypes.rejected, (state, action) => {
//                 state.propertyType.loading = false;
//                 state.propertyType.error = action.payload || "Error fetching property types";
//             });
//     },
// });

// export default PropertySlice.reducer;
