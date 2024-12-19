import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice"; // Import the reducer

export default configureStore({
  reducer: {
    global: globalReducer, // Use the reducer
  },
});
