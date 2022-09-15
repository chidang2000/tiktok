import { createSlice } from '@reduxjs/toolkit';

const currentUser =
    localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')) : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: currentUser,
        },
        register: {
            success: false,
        },
    },
    reducers: {
        // loginStart: (state) => {
        //     state.status = true;
        //     localStorage.setItem('isLogin', true);
        // },
        loginSucces: (state, action) => {
            state.login.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.login.currentUser));
        },
        logout: (state) => {
            localStorage.removeItem('currentUser');
            state.login.currentUser = null;
        },
        register: (state) => {
            state.register.success = true;
        },
    },
});

export const { loginSucces, logout, register } = authSlice.actions;
export default authSlice.reducer;
