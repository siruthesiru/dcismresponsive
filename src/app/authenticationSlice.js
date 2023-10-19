import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAccess: localStorage.getItem('isAccess') || false,
    isSucceed: localStorage.getItem('isSucceed') || false,
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    message: localStorage.getItem('message') || null,
    firstName: localStorage.getItem('firstName') || null,
    lastName: localStorage.getItem('lastName') || null,
    role: localStorage.getItem('role') || null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action) => {
            localStorage.setItem('isAccess', action.payload.isAccess);
            localStorage.setItem('isSucceed', action.payload.isSucceed);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('message', action.payload.message);
            localStorage.setItem('firstName', action.payload.firstName);
            localStorage.setItem('lastName', action.payload.lastName);
            localStorage.setItem('role', action.payload.role);
            
            state.isAccess = action.payload.isAccess;
            state.token = action.payload.token;
            state.isSucceed = action.payload.isSucceed;
            state.email = action.payload.email;
            state.message = action.payload.message;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.role = action.payload.role;
        },
        authenticationError: (state, action) => {
            state.isAccess = false;
            state.isSucceed = false;
            state.message = action.payload.message;
            state.email = null;
            state.token = null;
        },
        logout: () => {
            localStorage.clear();
            return initialState;
        },
        clearAccount: () => {
            localStorage.clear();
            return initialState;
        },
        forgotPasswordRequestSuccess: (state, action) => {
            state.isAccess = action.payload.isAccess;
            state.isSucceed = action.payload.isSucceed;
            state.message = action.payload.message;
        },
        clearForgotPasswordRequestStatus: (state) => {
            state.isAccess = false;
            state.isSucceed = false;
            state.message = null;
        },
        userChangePassword: (state, action) => {
            state.isAccess = action.payload.isAccess;
            state.isSucceed = action.payload.isSucceed;
            state.message = action.payload.message;;
        },
    },
});

export const { userAuthenticated, logout, authenticationError, forgotPasswordRequestSuccess, clearForgotPasswordRequestStatus, userChangePassword, clearAccount } = authenticationSlice.actions;

export default authenticationSlice.reducer;