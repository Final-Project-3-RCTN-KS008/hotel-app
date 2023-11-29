/* eslint-disable no-mixed-spaces-and-tabs */
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllHotels, searchHotels } from "./globalAction";

const initialState = {
  hotels: [],
  favorites: [],
  bookings: [],
  searchResults: [],
  isLoading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.name !== action.payload.name
      );
    },
    addBooking(state, action) {
      const bookingData = action.payload;
      state.favorites.push(bookingData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHotels.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.hotels = action.payload;
      })
      .addCase(fetchAllHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload; // Store search results
      })
      .addCase(searchHotels.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites, addBooking } =
  globalSlice.actions;

export default globalSlice.reducer;
