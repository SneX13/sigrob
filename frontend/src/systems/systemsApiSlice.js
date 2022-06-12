import {apiSlice} from "../services/apiSlice";

export const systemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSystems: builder.mutation({
            query: id => ({
                url: `/app/systems/?user=${id}`,
                method: 'GET',
            })
        }),
    })
})

export const {
    useGetSystemsMutation
} = systemsApiSlice