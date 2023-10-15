import axios from "axios";
import {
    getAllEvents,
    getAllEventsError,
    addEvent,
    addEventError,
    editEvent,
    editEventError,
    deleteEvent,
    deleteEventError,
    setErrorMessage,
} from '../app/eventsSlice'

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Events`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllEvents = async (dispatch) => {
    try {
        const { data } = await axiosInstance.get();
        dispatch(getAllEvents(data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllEventsError())
    }
}

export const AddEvent = async (dispatch, event) => {
    try {
        const response = await axiosInstance.post('', event);
        dispatch(addEvent(response.data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(addEventError(error.response.data));
    }
}

export const EditEvent = async (dispatch, event) => {
    try {
        await axiosInstance.put('', event);
        dispatch(editEvent(event));
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(editEventError(error.response.data));
    }
};

export const DeleteEvent = async (dispatch, event) => {
    try {
        await axiosInstance.delete('', { data: { ...event } });
        dispatch(deleteEvent(event));
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(deleteEventError(error.response.data));
    }
}