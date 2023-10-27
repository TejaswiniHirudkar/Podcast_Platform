import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null }, // Initial state may vary based on your needs
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => state.user.user; // Define the selectUser selector

export default userSlice.reducer;
