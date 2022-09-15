import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileSlice from './profileSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileSlice,
    },
});
