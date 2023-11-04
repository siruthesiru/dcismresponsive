import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';
import eventsSlice from './eventsSlice';
import announcementsSlice from './announcementsSlice';
import adminDashboardSlice from './adminDashboardSlice';
import alumniProfileSlice from './alumniProfileSlice';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    eventsSlice: eventsSlice,
    announcementsSlice: announcementsSlice,
    adminDashboard : adminDashboardSlice,
    alumniProfile : alumniProfileSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});