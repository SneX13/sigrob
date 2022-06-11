import {apiSlice} from "../services/apiSlice";

export const systemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSystems: builder.query({
            query: () => '/systems/',
            keepUnusedDataFor: 5, //cached for rtk query, default is 60sec
        })
    })
})

export const {
    useGetSystemsQuery
} = systemsApiSlice