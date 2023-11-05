import { createSlice, createAction } from '@reduxjs/toolkit';

export const deleteAlumniError = createAction('deleteAlumniError');
export const editAlumniError = createAction('editAlumniError');
export const addAlumniError = createAction('addAlumniError');
export const getAllAlumniError = createAction('getAllAlumniError');
export const getProfileError = createAction('getProfileError');
export const editProfileError = createAction('editProfileError');

export const alumniSlice = createSlice({
    name: 'alumni',
    initialState: {
        verifiedAlumni: [],
        unverifiedAlumni: [],
        adminProfile: null,
    },
    reducers: {
        getVerifiedAlumni: (state, action) => {
            return { ...state, verifiedAlumni: [...action.payload] };
        },
        getUnVerifiedAlumni: (state, action) => {
            return { ...state, unverifiedAlumni: [...action.payload] };
        },
        getProfile: (state, action) => {
            return { ...state, adminProfile: { ...action.payload } };
        },
        getAlumnusByID: (state, action) => {
            const updatedAlumnus = state.verifiedAlumni.map((alumnus) => {
                if (alumnus.id === action.payload.id) {
                    return { ...alumnus, ...action.payload };
                }
                return alumnus;
            });

            return { ...state, verifiedAlumni: updatedAlumnus };
        },
        addAlumni: (state, action) => {
            return { ...state, verifiedAlumni: [action.payload, ...state.alumni] };
        },
        editAlumni: (state, action) => {
            const alumni = state.verifiedAlumni.map(alumnus => {
                if (alumnus.id === action.payload.id) {
                    alumnus = action.payload;
                }
                return alumnus;
            });
            return { ...state, verifiedAlumni: [...alumni] };
        },
        verifyAlumni: (state, action) => {
            const alumni = state.unverifiedAlumni.map(alumnus => {
                if (alumnus.id === action.payload.id) {
                    alumnus = action.payload;
                }
                return alumnus;
            });
            return { ...state, unverifiedAlumni: [...alumni] };
        },
        deleteAlumni: (state, action) => {
            const alumni = state.verifiedAlumni.filter(alumnus => alumnus.id !== action.payload.id);
            return { ...state, verifiedAlumni: [...alumni] };
        },
        deleteVerifyAlumni: (state, action) => {
            const alumni = state.unverifiedAlumni.filter(alumnus => alumnus.id !== action.payload.id);
            return { ...state, unverifiedAlumni: [...alumni] };
        },
        editProfile: (state, action) => {
            return { ...state, userProfile: { ...action.payload } };
        },
    }
});

export const {
    getVerifiedAlumni,
    getUnVerifiedAlumni,
    getAlumnusByID,
    addAlumni,
    editAlumni,
    deleteAlumni,
    getProfile,
    editProfile,
    deleteVerifyAlumni
} = alumniSlice.actions;

export default alumniSlice.reducer;
