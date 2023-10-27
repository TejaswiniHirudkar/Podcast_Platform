import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicture: null, // Initialize with null, indicating no profile picture initially
};

const profilePictureSlice = createSlice({
  name: 'profilePicture',
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload; // Update the profile picture in the store
    },
    clearProfilePicture: (state) => {
      state.profilePicture = null; // Clear the profile picture in the store
    },
  },
});

export const { setProfilePicture, clearProfilePicture } = profilePictureSlice.actions;

export const selectProfilePicture = (state) => state.profilePicture.profilePicture;

export default profilePictureSlice.reducer;
