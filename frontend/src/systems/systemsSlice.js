import {createSlice} from "@reduxjs/toolkit";

const systemsSlice = createSlice({
    name: 'systems',
    initialState: {system: null},
    reducers: {
        setSystems: (state, action) => {
            const {systems} = action.payload
            state.systems = systems
        }
    },
})

export const {setSystems} = systemsSlice.actions;

export default systemsSlice.reducer;

export const selectAvailableSystems = (state) => state.systems.systems;
export const selectSystemById = (state, systemId) =>
    state.systems.systems.find(system => system.id === systemId);

