import { createSlice, createAction } from "@reduxjs/toolkit";

// Error Actions
export const getAnnouncementsError = createAction('getAnnouncementsError');
export const getAlumniProfileError = createAction('getAlumniProfileError');
export const getEventsError = createAction('getEventsError');
export const editProfileError = createAction('editProfileError');


export const alumniUserSlice = createSlice({
    name: 'alumni',
    initialState: {
        announcements: [],
        alumniProfile: null,
        events: [],
        errorMessage: null,
    },
    reducers: {
        getAnnouncements: (state, action) => {
            return { ...state, announcements: [...action.payload] };
        },
        getEvents: (state, action) => {
            return { ...state, events: [...action.payload] };
        },
        getAlumniProfile: (state, action) => {
            return { ...state, alumniProfile: { ...action.payload } };
        },
        setErrorMessage: (state, action) => {
            return { ...state, errorMessage: action.payload };
        },
        clearErrorMessage: (state) => {
            return { ...state, errorMessage: null };
        },
        editProfile: (state, action) => {
            const updatedAlumniProfile = { ...state.alumniProfile };
            for (const key in action.payload) {
                if (key in updatedAlumniProfile) {
                    updatedAlumniProfile[key] = action.payload[key];
                }
            }
            return { ...state, alumniProfile: updatedAlumniProfile };
        },
    }
});

export const { getAnnouncements, setErrorMessage, clearErrorMessage, getAlumniProfile, getEvents, editProfile } = alumniUserSlice.actions;

export default alumniUserSlice.reducer;
