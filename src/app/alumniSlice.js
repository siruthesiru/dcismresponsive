import { createSlice, createAction } from '@reduxjs/toolkit';

export const deleteAlumniError = createAction('deleteAlumniError');
export const editAlumniError = createAction('editAlumniError');
export const addAlumniError = createAction('addAlumniError');
export const getAllAlumniError = createAction('getAllAlumniError');

export const alumniSlice = createSlice({
    name: 'alumni',
    initialState: {
        alumni: [],
    },
    reducers: {
        getAlumni: (state, action) => {
            return { ...state, alumni: [...action.payload] };
        },
        getAlumnusByID: (state, action) => {
            const updatedAlumnus = state.alumni.map((alumnus) => {
                if (alumnus.id === action.payload.id) {
                    return { ...alumnus, ...action.payload };
                }
                return alumnus;
            });

            return { ...state, alumni: updatedAlumnus };
        },
        addAlumni: (state, action) => {
            return { ...state, alumni: [action.payload, ...state.alumni] };
        },
        editAlumni: (state, action) => {
            const alumni = state.alumni.map(alumnus => {
                if (alumnus.id === action.payload.id) {
                    alumnus = action.payload;
                }
                return alumnus;
            });
            return { ...state, alumni: [...alumni] };
        },
        deleteAlumni: (state, action) => {
            const alumni = state.alumni.filter(alumnus => alumnus.id !== action.payload.id);
            return { ...state, alumni: [...alumni] };
        }
    }
});

export const {
    getAlumni,
    getAlumnusByID,
    addAlumni,
    editAlumni,
    deleteAlumni,
} = alumniSlice.actions;

export default alumniSlice.reducer;
