
import {
    addEvent, editEvent, deleteEvent, addEventError, editEventError, deleteEventError, getAllEventsError
} from '../app/eventsSlice';
import { toast } from 'react-toastify';

const ToastMiddleware = () => next => action => {
    switch (action.type) {
        case addEvent.type:
            toast.success('New Event added successfully');
            break
        case editEvent.type:
            toast.success('Event  edited successfully');
            break;
        case deleteEvent.type:
            toast.success('Event deleted successfully');
            break
        case getAllEventsError.type:
            toast.error('Error loading expenses');
            break;
        case addEventError.type:
            toast.error('Error adding new event');
            break;
        case editEventError.type:
            toast.error('Error editing the event');
            break;
        case deleteEventError.type:
            toast.error('Error deleting the event');
            break;
        default:
            break;
    }
    return next(action);

}
export default ToastMiddleware;