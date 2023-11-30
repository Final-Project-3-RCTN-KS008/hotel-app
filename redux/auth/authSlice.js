import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authAction";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  token: null,
  user: { user: null, username: null, email: null, phoneNumber: null },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.token = null;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.token = action.payload?.token;
      state.user = action.payload.user;
    });
  },
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
