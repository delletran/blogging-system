import { configureStore } from '@reduxjs/toolkit';

import userApi from '../app/api';
import authReducer from '../features/auth/auth-slice'
import counterReducer from '../features/counter/counter-slice';
import userReducer from '../features/user/user-slice';


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    user: userReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
