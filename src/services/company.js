import axios from "axios";
import { addJobPost, addJobPostError, editProfile, editProfileError, getAnnouncements, getAnnouncementsError, getCandidates, getCompanyProfile, getCompanyProfileError, getEvents, getEventsError, getJob, getJobError, getJobs, getJobsError, setErrorMessage } from "../app/companyUserSlice";
import { toast } from 'react-toastify';


const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Company`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetCompanyProfile = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Profile');
        dispatch(getCompanyProfile(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getCompanyProfileError())
    }
}

export const GetAllAnnouncements = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Announcements');
        const announcements = response.data.filter(announcement => {
            return announcement.audience === "Company" || announcement.audience === "All";
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
            return event.audience === "Company" || event.audience === "All";
        });
        dispatch(getEvents(events));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getEventsError())
    }
}

export const GetAllJobs = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Jobs');
        dispatch(getJobs(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getJobsError())
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

        if (response.data.isEditSucceed) {
            dispatch(editProfile(response.data));
            toast.success(response.data.message);
        } else {
            dispatch(setErrorMessage(response.data.message));
            toast.error(response.data.message);
        }
        return response.data.isEditSucceed;
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(editProfileError(error.response.data));
    }
}


export const PostJob = async (dispatch, job) => {
    try {
        const response = await axiosInstance.post('/Jobs/Create-Job', job)
        if (response.data.isPostSucceed) {
            toast.success(response.data.message);
            dispatch(addJobPost(response.data))
        } else {
            toast.error(response.data.message);
        }
        return response.data.isPostSucceed;
    } catch (error) {
        console.error('Error:', error);
        dispatch(addJobPostError(error.response.data));
    }
}

export const GetJob = async (dispatch, id) => {
    try {
        const response = await axiosInstance.get(`/Jobs/Get-Job/${id}`, id)
        console.log(response.data);
        dispatch(getJob(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getJobError(error.response.data));
    }
}

export const ViewAllCandidates = async (dispatch, id) => {
    try {
        const response = await axiosInstance.get(`/Jobs/Get-Job/${id}/View-Candidates`, id)
        console.log(response.data);
        dispatch(getCandidates(response.data));
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        dispatch(getJobError(error.response.data));
    }
}
