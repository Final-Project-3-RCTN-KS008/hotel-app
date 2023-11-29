import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../service/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.post(`/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
