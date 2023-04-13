import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        role: '',
        accessToken: '',
        name: '',
        email: '',
        password: '',
        id: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})



export const { setUser } = userSlice.actions
export default userSlice.reducer