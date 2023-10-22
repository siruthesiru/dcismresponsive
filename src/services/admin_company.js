import axios from "axios";
import {
    getCompanies,
    // getCompanyByID,
    getCompaniesError,
    verifyCompany,
    verifyCompanyError,
    rejectCompany,
    rejectCompanyError
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

export const RejectCompany = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Company/Delete/${id}`);
        dispatch(rejectCompany(id));
    } catch {
        dispatch(rejectCompanyError());
    }
}

export const Verify_Company = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/Company/Verify-Company', credentials)
        dispatch(verifyCompany(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(verifyCompanyError(error.response.data));
    }
}

// export const GetAlumniByID = async (dispatch, id) => {
//     try {
//         const response = await axiosInstance.get(`/Alumni/${id}`);
//         dispatch(getAlumnusByID(response.data));
//         return response.data;
//     } catch (error) {
//         console.error('Error:', error);
//         dispatch(getAlumni());
//     }
// }

// export const AddAlumni = async (dispatch, alumni) => {
//     try {
//         const response = await axiosInstance.post('/Alumni/Add-Alumni', alumni)
//         console.log(response.data);
//         dispatch(addAlumni(response.data));
//     } catch (error) {
//         console.error('Error:', error);
//         dispatch(addAlumniError(error.response.data));
//     }
// }

// export const EditAlumni = async (dispatch, alumni, id) => {
//     try {
//         const formData = new FormData();
//         for (const key in alumni) {
//             if (key === 'file' && alumni[key]) {
//                 formData.append(key, alumni[key]);
//             } else {
//                 formData.append(key, alumni[key]);
//             }
//         }
//         const response = await axiosInstance.put(`/Alumni/Update/${id}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         dispatch(editAlumni(response.data));
//     } catch (error) {
//         console.error('Error:', error);
//         dispatch(editAlumniError(error.response.data));
//     }
// }

