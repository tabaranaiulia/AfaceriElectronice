import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: null,
  role: null, // Add role to the initial state
  checkTokenLoading: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setCheckTokenLoading: (state, action) => {
      state.checkTokenLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload; // Add a reducer to update the role
    },
  },
});

export const { setCheckTokenLoading, setLoggedIn, setToken, setRole } =
  globalSlice.actions;

export default globalSlice.reducer;
