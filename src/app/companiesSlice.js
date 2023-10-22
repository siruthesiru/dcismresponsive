import { createSlice, createAction } from '@reduxjs/toolkit';

export const rejectCompanyError = createAction('rejectCompanyError');
export const verifyCompanyError = createAction('verifyCompanyError');
export const getCompaniesError = createAction('getCompaniesError');

export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
        companies: [],
    },
    reducers: {
        getCompanies: (state, action) => {
            return { ...state, companies: [...action.payload] };
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
            const companies = state.companies.map(company => {
                if (company.id === action.payload.id) {
                    company = action.payload;
                }
                return company;
            });
            return { ...state, companies: [...companies] };
        },
        rejectCompany: (state, action) => {
            const companies = state.companies.filter(company => company.id !== action.payload.id);
            return { ...state, companies: [...companies] };
        }
    }
});

export const {
    getCompanies,
    getCompanyByID,
    verifyCompany,
    rejectCompany
} = companiesSlice.actions;

export default companiesSlice.reducer;
