import axios from "axios";
import {
    getAlumnusByID,
    addAlumni,
    editAlumni,
    deleteAlumni,
    getAllAlumniError,
    addAlumniError,
    editAlumniError,
    deleteAlumniError,
    getProfile,
    getProfileError,
    editProfile,
    editProfileError,
    getVerifiedAlumni,
    deleteVerifyAlumni,
    getUnVerifiedAlumni,
} from '../app/alumniSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetProfile = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Profile');
        dispatch(getProfile(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getProfileError());
    }
};

export const GetAlumni = async (dispatch, isVerified) => {
    try {
        const response = await axiosInstance.get('/Alumni');
        dispatch(getVerifiedAlumni(response.data.verifiedAlumni));
        dispatch(getUnVerifiedAlumni(response.data.alumniToVerify));

    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAlumniError('Error fetching alumni data.'));
    }
}

export const GetAlumniByID = async (dispatch, id) => {
    try {
        const response = await axiosInstance.get(`/Alumni/Get-Alumni/${id}`);
        dispatch(getAlumnusByID(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAlumniError());
    }
}

export const AddAlumni = async (dispatch, alumni) => {
    try {
        const response = await axiosInstance.post('/Alumni/Add-Alumni', alumni)
        dispatch(addAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(addAlumniError(error.response.data));
    }
}

export const AddAlumniCSV = async (dispatch, formData) => {
    try {
        const response = await axiosInstance.post('/Alumni/Add-CSV', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(addAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(addAlumniError(error.response.data));
    }
};


export const VerifyAlumni = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.put('/Alumni/Verify-Alumni', credentials)
        dispatch(editAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAlumni(error.response.data));
    }
}

export const EditAlumni = async (dispatch, alumni) => {
    try {
        const response = await axiosInstance.put('/Alumni/Edit-Alumni', alumni)
        dispatch(editAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAlumniError(error.response.data));
    }
}

export const DeleteAlumni = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Alumni/Reject-Alumni/${id}`);
        dispatch(deleteAlumni(id));
    } catch (error) {
        console.error('Error deleting alumni:', error);
        dispatch(deleteAlumniError());
    }
}

export const DeleteAlumniVerify = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Alumni/Reject-Alumni/${id}`);
        dispatch(deleteVerifyAlumni(id));
    } catch (error) {
        console.error('Error deleting alumni:', error);
        dispatch(deleteAlumniError());
    }
}

export const EditProfile = async (dispatch, credentials) => {
    try {
        const formData = new FormData();
        for (const key in credentials) {
            if (key === 'file' && credentials[key]) {
                formData.append(key, credentials[key]);
            } else {
                formData.append(key, credentials[key]);
            }
        }
        const response = await axiosInstance.put('Profile-Edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(editProfile(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(editProfileError(error.response.data));
    }
}