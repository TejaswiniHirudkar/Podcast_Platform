import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import podcastsReducer from './slices/podcastSlice';
import profilePictureReducer from './slices/profilePictureSlice';

// Create a custom reducer to handle user data reset
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    // Reset user data when the user logs out
    state.user = undefined;
    state.podcasts = []; // Reset other user-related data as needed
    state.profilePicture = null; // Reset profile picture
  }
  return combineReducers({
    user: userReducer,
    podcasts: podcastsReducer,
    profilePicture: profilePictureReducer,
  })(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
