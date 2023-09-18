import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSucceed: false,
    message: null,
    email: null,
    token: null,
};

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    initialState,
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
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
        logout: (state) => {
            sessionStorage.clear();
            state = initialState;
        },
    },
            state = initialState;
        },
    },
});

export const { userAuthenticated, logout, authenticationError } = authenticationSlice.actions;

export default authenticationSlice.reducer;