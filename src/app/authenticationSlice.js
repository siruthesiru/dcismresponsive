import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        token: '',
        isLoggedIn: false,
        isSucceed: false,
    },
    reducers: {
        userAuthenticated: (state, action) => {
            sessionStorage.setItem('token', action.payload.token);
            return {
                ...state, ...{
                    token: action.payload.token,
                    isSucceed: action.payload.isSucceed,
                    isLoggedIn: true,
                }
            }
        },authenticationError: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        logout: () => {
            sessionStorage.clear();
        }
    }
});

export const { userAuthenticated, logout, authenticationError } = authenticationSlice.actions;

export default authenticationSlice.reducer;


