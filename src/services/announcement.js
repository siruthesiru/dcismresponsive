import axios from "axios";
import {
    getAllAnnouncements,
    getAllAnnouncementsError,
    editAnnouncement,
    editAnnouncementError,
    deleteAnnouncement,
    deleteAnnouncementError,
    addAnnouncement,
    addAAnnouncementError,
    getAnnouncementByID,
    setErrorMessage
} from '../app/announcementsSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Announcements`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllAnnouncements = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get();
        dispatch(getAllAnnouncements(data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAnnouncementsError())
    }
}

export const GetAnnouncementByID = async (dispatch, id) => {
    try {
        const { data } = await axiosInstance.get(`/${id}`);
        dispatch(getAnnouncementByID(data));
        return data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError());
    }
}

export const AddAnnouncement = async (dispatch, Announcement) => {
    try {
        const response = await axiosInstance.post('', Announcement);
        dispatch(addAnnouncement(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(addAAnnouncementError(error.response.data));
    }
}

export const EditAnnouncement = async (dispatch, Announcement, id) => {
    try {
        await axiosInstance.put(`/${id}`, Announcement);
        dispatch(editAnnouncement(Announcement))
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError())
    }
}

export const DeleteAnnouncement = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`/${id}`);
        dispatch(deleteAnnouncement(id));
    } catch {
        dispatch(deleteAnnouncementError());
    }
}