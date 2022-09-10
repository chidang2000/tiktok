import { createSlice } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('currentUser') !== null ? JSON.parse(localStorage.getItem('currentUser')) : {};
const isLogin = localStorage.getItem('isLogin') !== false ? JSON.parse(localStorage.getItem('isLogin')) : false;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: currentUser,
            status: isLogin,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.status = true;
            localStorage.setItem('isLogin', true);
        },
        loginSucces: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        },
        logout: (state) => {
            state.status = localStorage.removeItem('isLogin');
            state.currentUser = localStorage.removeItem('currentUser');
        },
    },
});

export const { loginStart, loginSucces, logout } = authSlice.actions;
export default authSlice.reducer;
