import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedVideo: null,
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        setSelectedVideo: (state, action) => {
            state.selectedVideo = action.payload
        },



    }
})



export const { setSelectedVideo } = videoSlice.actions
export default videoSlice.reducer