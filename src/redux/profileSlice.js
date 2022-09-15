import { createSlice } from '@reduxjs/toolkit';

const profileUserSlice = createSlice({
    name: 'profile',
    initialState: {
        info: null,
    },
    reducers: {
        success: (state, action) => {
            state.info = action.payload;
        },
    },
});

export const { success } = profileUserSlice.actions;

export default profileUserSlice.reducer;
