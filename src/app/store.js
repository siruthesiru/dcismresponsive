import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';
import eventsSlice from './eventsSlice';
import announcementsSlice from './announcementsSlice';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    eventsSlice: eventsSlice,
    announcementsSlice: announcementsSlice,
    expensesSlice: expensesSlice,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});