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
    baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + localStorage.getItem('token') };
    return config;
});

export const GetAllEvents = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/Events');
        const eventData = response.data;
        dispatch(getAllEvents(eventData));
    } catch (error) {
        console.error('Error:', error);
        dispatch(getAllEventsError());
    }
}

export const AddEvent = async (dispatch, event) => {
    try {
        const formData = new FormData();
        formData.append('Title', event.title);
        formData.append('Description', event.description);
        formData.append('Audience', event.audience);
        formData.append('Venue', event.venue);
        formData.append('Start', event.start);
        formData.append('End', event.end);

        const response = await axiosInstance.post('/Events/Create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);

        dispatch(addEvent(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(addEventError(error.response.data));
    }
}

export const EditEvent = async (dispatch, event) => {
    try {
        const formData = new FormData();
        formData.append('Title', event.title);
        formData.append('Description', event.description);
        formData.append('Audience', event.audience);
        formData.append('Venue', event.venue);
        formData.append('Start', event.start);
        formData.append('End', event.end);

        const response = await axiosInstance.put(`/Events/Update/${event.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(editEvent(response.data));
    } catch (error) {
        console.error('Error:', error);
        dispatch(setErrorMessage(error.response.data || 'An error occurred on the server.'));
        dispatch(editEventError(error.response.data));
    }
};

export const DeleteEvent = async (dispatch, id) => {
    try {
        await axiosInstance.delete(`Events/Delete/${id}`);
        dispatch(deleteEvent(id));
    } catch (error) {
        dispatch(deleteEventError());
    }
}