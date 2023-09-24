import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSucceed: localStorage.getItem('isSucceed') || false,
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    message: null,
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    role: localStorage.getItem('role') || null,
    forgotPasswordRequestSuccess: false,

};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action) => {
            localStorage.setItem('isSucceed', action.payload.isSucceed);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('firstName', action.payload.firstName);
            localStorage.setItem('lastName', action.payload.lastName);
            localStorage.setItem('role', action.payload.role);

            state.token = action.payload.token;
            state.isSucceed = action.payload.isSucceed;
            state.email = action.payload.email;
            state.message = null;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
        },
        authenticationError: (state, action) => {
            const { message } = action.payload;
            state.isSucceed = false;
            state.message = message;
            state.email = null;
            state.token = null;
        },
        logout: (state) => {
            localStorage.clear();
            state = initialState;
        },
        forgotPasswordRequestSuccess: (state, action) => {
            state.forgotPasswordRequestSuccess = true;
            state.message = action.payload.message;
        },
        clearForgotPasswordRequestStatus: (state) => {
            state.forgotPasswordRequestSuccess = false;
            state.message = null;
        }
    },
});

export const { userAuthenticated, logout, authenticationError, forgotPasswordRequestSuccess, clearForgotPasswordRequestStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;