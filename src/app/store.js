import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice'
import userReducer from '../features/user/userSlice'
import videoReducer from '../features/video/videoSlice'
import QuizeReducer from '../features/quize/quizeSlice'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    video: videoReducer,
    quize: QuizeReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
