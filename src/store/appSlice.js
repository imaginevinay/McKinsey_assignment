import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name : 'app',
    initialState: {
        data : {},
    },
    reducers: {
        addData: (state,action) => {
            state.data = {...action.payload};
        }
    }
})

export const {addData} = appSlice.actions;
export default appSlice.reducer;