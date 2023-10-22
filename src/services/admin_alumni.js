import axios from "axios";
import {
    getAlumni,
    getAlumnusByID,
    addAlumni,
    editAlumni,
    deleteAlumni,
    getAllAlumniError,
    addAlumniError,
    editAlumniError,
    deleteAlumniError,
} from '../app/alumniSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllAlumni = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Alumni');
        dispatch(getAlumni(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAlumniError())
    }
}

export const GetAlumniByID = async (dispatch, id) => {
    try {
        const response = await axiosInstance.get(`/Alumni/${id}`);
        dispatch(getAlumnusByID(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAlumni());
    }
}

export const AddAlumni = async (dispatch, alumni) => {
    try {
        const response = await axiosInstance.post('/Alumni/Add-Alumni', alumni)
        console.log(response.data);
        dispatch(addAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(addAlumniError(error.response.data));
    }
}

export const VerifyAlumni = async (dispatch, credentials) => {
    try {
        const response = await axiosInstance.post('/Alumni/Verify-Alumni', credentials)
        dispatch(editAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(addAlumniError(error.response.data));
    }
}

export const EditAlumni = async (dispatch, alumni, id) => {
    try {
        const formData = new FormData();
        for (const key in alumni) {
            if (key === 'file' && alumni[key]) {
                formData.append(key, alumni[key]);
            } else {
                formData.append(key, alumni[key]);
            }
        }
        const response = await axiosInstance.put(`/Alumni/Update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(editAlumni(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAlumniError(error.response.data));
    }
}

export const DeleteAlumni = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Alumni/Delete/${id}`);
        dispatch(deleteAlumni(id));
    } catch {
        dispatch(deleteAlumniError());
    }
}