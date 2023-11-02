import { createSlice, createAction } from "@reduxjs/toolkit";

//Error Actions
export const getAnnouncementsError = createAction('getAnnouncementsError');
export const getAlumniProfileError = createAction('getAlumniProfileError');


export const alumniUserSlice = createSlice({
    name: 'alumni',
    initialState: {
        announcements: [],
        alumniProfile: [],
        errorMessage: null,
    },
    reducers: {
        getAnnouncements: (state, action) => {
            return { ...state, announcements: [...action.payload] };
        },
        getAlumniProfile: (state, action) => {
            return { ...state, alumniProfile: { ...action.payload } };
        },
        setErrorMessage: (state, action) => {
            return { ...state, errorMessage: action.payload };
        },
        clearErrorMessage: (state,) => {
            return { ...state, errorMessage: null };
        },
    }

})

export const { getAnnouncements, setErrorMessage, clearErrorMessage, getAlumniProfile } = alumniUserSlice.actions;

export default alumniUserSlice.reducer;