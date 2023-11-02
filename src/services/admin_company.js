import axios from "axios";
import {
    getCompanies,
    // getCompanyByID,
    getCompaniesError,
    verifyCompany,
    verifyCompanyError,
    rejectCompany,
    rejectCompanyError,
    getUnverifiedCompanies
} from '../app/companiesSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetCompanies = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company');
        dispatch(getCompanies(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getCompaniesError())
    }
}

export const GetUnverifiedCompanies = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Company');
        const unverifiedCompanies = response.data.filter(company => {
            return !company.isVerified && company.moa !== null;
        });
        dispatch(getUnverifiedCompanies(unverifiedCompanies));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getCompaniesError());
    }
}

export const RejectCompany = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Company/Reject-Company/${id}`);
        dispatch(rejectCompany(id));
    } catch {
        dispatch(rejectCompanyError());
    }
}

export const Verify_Company = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.put('/Company/Verify-Company', credentials)
        dispatch(verifyCompany(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(verifyCompanyError(error.response.data));
    }
}


