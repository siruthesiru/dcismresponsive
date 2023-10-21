import axios from "axios";
import {
    getAllAnnouncements,
    getAllAnnouncementsError,
    editAnnouncement,
    editAnnouncementError,
    deleteAnnouncement,
    deleteAnnouncementError,
    addAnnouncement,
    getAnnouncementByID,
    setErrorMessage,
    addAnnouncementError
} from '../app/announcementsSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllAnnouncements = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Annoucements');
        console.log(response)
        dispatch(getAllAnnouncements(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAnnouncementsError())
    }
}

export const GetAnnouncementByID = async (dispatch, id) => {
    try {
        const { data } = await axiosInstance.get(`/Announcements/${id}`);
        dispatch(getAnnouncementByID(data));
        return data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError());
    }
}

export const AddAnnouncement = async (dispatch, Announcement) => {
    try {
        const response = await axiosInstance.post('/Announcements/Create', Announcement);
        dispatch(addAnnouncement(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(addAnnouncementError(error.response.data));
    }
}

export const EditAnnouncement = async (dispatch, Announcement, id) => {
    try {
        await axiosInstance.put(`Announcements/Update/${id}`, Announcement);
        dispatch(editAnnouncement(Announcement))
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError())
    }
}

export const DeleteAnnouncement = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Announcements/Delete/${id}`);
        dispatch(deleteAnnouncement(id));
    } catch {
        dispatch(deleteAnnouncementError());
    }
}