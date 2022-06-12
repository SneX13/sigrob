import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../auth/authSlice';

/* use this instead of axios */
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})
/* wrapper for base query if base query fails reattempt after sending a refresh token and getting the new access token
* e.g. if access token expires access the current refresh token will allow to get new access token */
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    /*todo: add handling other status codes that are coming from backend */
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token
        //todo: check if the endpoint for token refresh is correct
        const refreshResult = await baseQuery('/token/refresh/', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});