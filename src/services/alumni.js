import axios from "axios";
// import { toast } from 'react-toastify';
import { getAlumniProfile, getAlumniProfileError, getAnnouncements, getAnnouncementsError } from "../app/alumniUserSlice";


const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Alumni`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAlumniProfile = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Profile');
        dispatch(getAlumniProfile(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAlumniProfileError())
    }
}

export const GetAllAnnouncements = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Announcements');
        const announcements = response.data.filter(announcement => {
            return announcement.audience === "Alumni" || announcement.audience === "All";
        });
        dispatch(getAnnouncements(announcements));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAnnouncementsError())
    }
}

