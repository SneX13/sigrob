import {apiSlice} from "../services/apiSlice";
import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { sub } from 'date-fns';

/*Managing Normalizing Data with createEntityAdapter which accepts an options object that may include a sortComparer
function, which will be used to keep the item IDs array in sorted order by comparing two items (and works the same way
as Array.sort()).
Read more here: https://redux.js.org/tutorials/essentials/part-6-performance-normalization#normalizing-data*/
const systemsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = systemsAdapter.getInitialState()

export const systemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSystems: builder.mutation({
            query: id => ({
                url: `/api/systems/?user=${id}`,
                method: 'GET',
            }),

            providesTags: (result, error, arg) => [
                ...result.ids.map(id => ({type: 'System', id}))
            ]
        }),
        addNewSystem: builder.mutation({
            query: initialSystem => ({
                url: '/api/systems',
                method: 'POST',
                body: {
                    ...initialSystem,
                }
            }),
            invalidatesTags: [
                {type: 'System', id: "LIST"}
            ]
        }),
        updateSystem: builder.mutation({
            query: initialSystem => ({
                url: `/api/systems/${initialSystem.id}`,
                method: 'PUT',
                body: {
                    ...initialSystem,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'System', id: arg.id}
            ]
        }),
        deleteSystem: builder.mutation({
            query: ({id}) => ({
                url: `/api/systems/${id}`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'System', id: arg.id}
            ]
        })
    })
})

export const {
    useGetSystemsMutation,
    useAddNewSystemMutation,
    useUpdateSystemMutation,
    useDeleteSystemMutation,
} = systemsApiSlice

// returns the query result object
export const selectSystemsResult = systemsApiSlice.endpoints.getSystems.select()

// Creates memoized selector
const selectSystemsData = createSelector(
    selectSystemsResult,
    systemsResult => systemsResult.data // normalized state object with ids & entities
)
export const {
    selectAll: selectAllSystems,
    selectById: selectSystemById,
    selectIds: selectSystemIds
    // Pass in a selector that returns the systems slice of state
} = systemsAdapter.getSelectors(state => selectSystemsData(state) ?? initialState)