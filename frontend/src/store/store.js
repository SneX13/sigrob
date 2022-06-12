import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../services/apiSlice";
import authReducer from '../auth/authSlice';
import systemsReducer from '../systems/systemsSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        systems: systemsReducer,
    },

    middleware: getDefaultMiddleware =>
        /* for caching */
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true //should be removed for production
})