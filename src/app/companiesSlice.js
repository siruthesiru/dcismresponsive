import { createSlice, createAction } from '@reduxjs/toolkit';

export const rejectCompanyError = createAction('rejectCompanyError');
export const verifyCompanyError = createAction('verifyCompanyError');
export const getCompaniesError = createAction('getCompaniesError');
export const getPostError = createAction('getPostError');

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
        unverified_companies: [],
        verified_post: [],
        unverified_post: [],
    },
    reducers: {
        getCompanies: (state, action) => {
            state.companies = action.payload;
        },
        getUnverifiedCompanies: (state, action) => {
            state.unverified_companies = action.payload;
        },
        getVerifiedPost: (state, action) => {
            state.verified_post = action.payload;
        },
        getUnverifiedPost: (state, action) => {
            state.unverified_post = action.payload;
        },
        getCompanyByID: (state, action) => {
            const updatedCompany = state.companies.map((company) => {
                if (company.id === action.payload.id) {
                    return { ...company, ...action.payload };
                }
                return company;
            });

            return { ...state, alumni: updatedCompany };
        },
        verifyCompany: (state, action) => {
            const unverified_companies = state.unverified_companies.map(company => {
                if (company.id === action.payload.id) {
                    company = action.payload;
                }
                return company;
            });
            return { ...state, unverified_companies: [...unverified_companies] };
        },
        rejectCompany: (state, action) => {
            const unverified_companies = state.unverified_companies.map(company => {
                if (company.id === action.payload.id) {
                    company = action.payload;
                }
                return company;
            });
            return { ...state, unverified_companies: [...unverified_companies] };
        },
        verifyPost: (state, action) => {
            const unverified_post = state.unverified_post.map(post => {
                if (post.id === action.payload.id) {
                    post = action.payload;
                }
                return post;
            });
            return { ...state, unverified_post: [...unverified_post] };
        },
        rejectPost: (state, action) => {
            const unverified_post = state.unverified_post.filter(post =>
                post.id !== action.payload.id);
            return { ...state, unverified_post: [...unverified_post] }
        },
    }
});

export const {
    getCompanies,
    getUnverifiedCompanies,
    getVerifiedPost,
    getUnverifiedPost,
    getCompanyByID,
    verifyCompany,
    rejectCompany,
    verifyPost,
    rejectPost
} = companiesSlice.actions;

export default companiesSlice.reducer;
