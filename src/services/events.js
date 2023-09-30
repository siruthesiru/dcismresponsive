import axios from "axios";
import {
    getAllEvents,
    getAllEventsError,
    addEvent,
    addEventError,
    editEvent,
    editEventError,
    deleteEvent,
    deleteEventError
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
        const { data } = await axiosInstance.post('', event);
        dispatch(addEvent(data))
    } catch (error) {
        console.error('Error:', error);
        dispatch(addEventError())
    }
}

export const EditEvent = async (dispatch, event) => {
    try {
        await axiosInstance.put('', event);
        dispatch(editEvent(event));
    } catch (error) {
        console.error('Error:', error);
        dispatch(editEventError());
    }
};

export const DeleteEvent = async (dispatch, event) => {
    try {
        await axiosInstance.delete('', { data: { ...event } });
        dispatch(deleteEvent(event));
    } catch {
        dispatch(deleteEventError());
    }
}