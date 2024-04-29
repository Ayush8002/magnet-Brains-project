import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './features/userReducer'
import { userApi } from './APIs/userapi';
import { taskApi } from './APIs/taskapi';
import { taskSlice } from './features/taskReducer';


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userSlice.name]: userSlice.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [taskSlice.name]: taskSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,taskApi.middleware),
})

