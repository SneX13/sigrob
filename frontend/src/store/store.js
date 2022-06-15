import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/apiSlice";
import authReducer from '../auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },

    middleware: getDefaultMiddleware =>
        /* for caching */
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true //should be removed for production
})