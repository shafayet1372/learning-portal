import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizes: [],
}

const quizeSlice = createSlice({
    name: 'quize',
    initialState,
    reducers: {
        setQuizeOptions: (state, action) => {
            state.quizes.push(action.payload)
        },
        removeQuizOptions: (state, action) => {

            state.quizes = state.quizes.filter(quize => quize.id !== action.payload)
        },
        resetQuizeOptions: (state, action) => {
            state.quizes = []
        }
    }
})



export const { setQuizeOptions, removeQuizOptions, resetQuizeOptions } = quizeSlice.actions
export default quizeSlice.reducer