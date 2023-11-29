import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../service/api";

export const fetchAllHotels = createAsyncThunk(
  "hotels/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://hotel-api-production-0e8a.up.railway.app/api/hotels"
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        // Handle non-200 status codes
        throw new Error("Error fetching hotels");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchHotels = createAsyncThunk(
  "search/searchHotels",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://hotel-api-production-0e8a.up.railway.app/api/hotels/search?keyword=${keyword}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
