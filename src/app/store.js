import { configureStore } from '@reduxjs/toolkit';
import ToastMiddleware from '../middleware/ToastMiddleware';
import thunk from 'redux-thunk';

import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import eventsSlice from './eventsSlice';
import announcementsSlice from './announcementsSlice';
import alumniSlice from './alumniSlice';
import companiesSlice from './companiesSlice';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    eventsSlice: eventsSlice,
    announcementsSlice: announcementsSlice,
    expensesSlice: expensesSlice,
    alumniSlice: alumniSlice,
    companiesSlice: companiesSlice

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware, thunk),
});