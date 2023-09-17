import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authenticationSlice';
import expensesSlice from './expensesSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';

export default configureStore({
  reducer: {
    authentication: authenticationSlice,
    expensesSlice: expensesSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});
