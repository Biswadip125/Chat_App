import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    onlineUsers: null,
    activeComponent: "users",
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setActiveComponent: (state, action) => {
      state.activeComponent = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setOtherUsers,
  setOnlineUsers,
  setActiveComponent,
} = userSlice.actions;
export default userSlice.reducer;
