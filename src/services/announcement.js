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
    getAnnouncementByID
} from '../app/announcementsSlice'
import { mockAnnouncements } from "../data/mockAdminData";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Announcements`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllAnnouncements = async (dispatch) => {
    try {
        // const { data } = await axiosInstance.get();
        const data = mockAnnouncements;
        dispatch(getAllAnnouncements(data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllAnnouncementsError())
    }
}

export const GetAnnouncementByID = async (dispatch, id) => {
    try {
        // const { data } = await axiosInstance.get(`/${id}`);
        // dispatch(editAnnouncement(data));

        const announcementId = parseInt(id, 10); // Convert id to a number
        const announcement = mockAnnouncements.find((announcement) => announcement.id === announcementId);
        dispatch(getAnnouncementByID(announcement));
        return announcement;
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError());
    }
}

export const AddAnnouncement = async (dispatch, Announcement) => {
    try {
        const { data } = await axiosInstance.post('', Announcement);
        dispatch(addAnnouncement(data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(addAAnnouncementError())
    }
}

export const EditAnnouncement = async (dispatch, Announcement) => {
    try {
        await axiosInstance.put('', Announcement);
        dispatch(editAnnouncement(Announcement))
    } catch (error) {
        console.error('Error:', error);
        dispatch(editAnnouncementError())
    }
}

export const DeleteAnnouncement = async (dispatch, Announcement) => {
    try {
        await axiosInstance.delete('', { data: { ...Announcement } });
        dispatch(deleteAnnouncement(Announcement));
    } catch {
        dispatch(deleteAnnouncementError());
    }
}