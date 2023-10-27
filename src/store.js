import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import podcastsReducer from './slices/podcastSlice';
import profilePictureReducer from './slices/profilePictureSlice'; // Import the new reducer for profile pictures

export default configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastsReducer,
    profilePicture: profilePictureReducer, // Add the new reducer for profile pictures
  },
});
