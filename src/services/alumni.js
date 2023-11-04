import axios from "axios";
// import { toast } from 'react-toastify';
import { editProfile, editProfileError, getAlumniProfile, getAlumniProfileError, getAnnouncements, getAnnouncementsError, getEvents, getEventsError, setErrorMessage } from "../app/alumniUserSlice";


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

export const GetAllEvents = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Events');
        const events = response.data.filter(event => {
            return event.audience === "Alumni" || event.audience === "All";
        });
        dispatch(getEvents(events));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getEventsError())
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
        const response = await axiosInstance.put('/Profile-Edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        dispatch(editProfile(response.data));

        //  if (response.data.isEditSucceed) {
        //     dispatch(editProfile(response.data));
        // } else {
        //     dispatch(setErrorMessage(response.data.message));
        //     toast.error(response.data.message);
        // }
        return response.data.isEditSucceed;
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(editProfileError(error.response.data));
    }
}