import { createSlice, createAction } from "@reduxjs/toolkit";

// Error Actions
export const getAnnouncementsError = createAction('getAnnouncementsError');
export const getCompanyProfileError = createAction('getCompanyProfileError');
export const getEventsError = createAction('getEventsError');
export const editProfileError = createAction('editProfileError');


export const companyUserSlice = createSlice({
    name: 'company',
    initialState: {
        announcements: [],
        companyProfile: null,
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
        getCompanyProfile: (state, action) => {
            return { ...state, companyProfile: { ...action.payload } };
        },
        setErrorMessage: (state, action) => {
            return { ...state, errorMessage: action.payload };
        },
        clearErrorMessage: (state) => {
            return { ...state, errorMessage: null };
        },
        editProfile: (state, action) => {
            const updatedCompanyProfile = { ...state.companyProfile };
            for (const key in action.payload) {
                if (key in updatedCompanyProfile) {
                    updatedCompanyProfile[key] = action.payload[key];
                }
            }
            return { ...state, companyProfile: updatedCompanyProfile };
        },
    }
});

export const { getAnnouncements, setErrorMessage, clearErrorMessage, getCompanyProfile, getEvents, editProfile } = companyUserSlice.actions;

export default companyUserSlice.reducer;
