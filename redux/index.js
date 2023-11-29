import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./auth/authSlice";
import hotelsReducer from "./global/globalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  hotels: hotelsReducer,
});
const middlewares = [];
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
