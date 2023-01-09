import {configureStore} from '@reduxjs/toolkit';
import {getUsers} from './reducers/getUserSlice';
import {authSlice} from './reducers/authSlice';
export default configureStore({
  reducer: {
    getUsers: getUsers.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
