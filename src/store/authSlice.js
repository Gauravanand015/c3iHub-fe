import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const initialState = {
  user: null,
  token: null,
  blur: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    version: 1,
  },
  authSlice.reducer
);

export default persistedReducer;
