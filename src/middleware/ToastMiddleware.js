import { toast } from 'react-toastify';
import {
    addAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
    addAnnouncementError,
    editAnnouncementError,
    deleteAnnouncementError,
    getAllAnnouncementsError
} from '../app/announcementsSlice';

import {
    addEvent,
    editEvent,
    deleteEvent,
    addEventError,
    editEventError,
    deleteEventError,
    getAllEventsError
} from '../app/eventsSlice';
import { addAlumni, addAlumniError, deleteAlumni, deleteAlumniError, editAlumni, editAlumniError, getAllAlumniError } from '../app/alumniSlice';

const ToastMiddleware = () => (next) => (action) => {
    switch (action.type) {
        // Events
        case addEvent.type:
            toast.success('New Event added successfully');
            break;
        case editEvent.type:
            toast.success('Event edited successfully');
            break;
        case deleteEvent.type:
            toast.success('Event deleted successfully');
            break;
        case getAllEventsError.type:
            toast.error('Error loading events');
            break;
        case addEventError.type:
        case editEventError.type:
        case deleteEventError.type:
            toast.error(action.payload);
            break;

        // Announcements
        case addAnnouncement.type:
            toast.success('New Announcement added successfully');
            break;
        case editAnnouncement.type:
            toast.success('Announcement updated successfully');
            break;
        case deleteAnnouncement.type:
            toast.success('Announcement deleted successfully');
            break;
        case getAllAnnouncementsError.type:
            toast.error('Error loading announcements');
            break;
        case addAnnouncementError.type:
        case editAnnouncementError.type:
        case deleteAnnouncementError.type:
            toast.error(action.payload);
            break;


        // alumni
        case addAlumni.type:
            toast.success('New Alumna added successfully');
            break;
        case editAlumni.type:
            toast.success('Alumna updated successfully');
            break;
        case deleteAlumni.type:
            toast.success('Alumna deleted successfully');
            break;
        case getAllAlumniError.type:
            toast.error('Error loading announcements');
            break;
        case addAlumniError.type:
        case editAlumniError.type:
        case deleteAlumniError.type:
            toast.error(action.payload);
            break;


        default:
            break;
    }
    return next(action);
};

export default ToastMiddleware;
