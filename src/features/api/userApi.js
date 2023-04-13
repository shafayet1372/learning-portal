import { apiSlice } from "./apiSlice"
import { setUser } from "../user/userSlice"
const userApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        userLogin: build.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                const response = await queryFulfilled
                const { data } = response
                const { user: { name, password, email, role, id }, accessToken } = data
                localStorage.setItem('user', JSON.stringify({ role, accessToken, name, password, email, id }))
                dispatch(setUser({ role, accessToken, name, password, email, id }))
            }

        }),

        userRegister: build.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                const response = await queryFulfilled
                const { data } = response
                const { user: { name, password, email, role, id }, accessToken } = data
                window.localStorage.setItem('user', JSON.stringify({ role, accessToken, name, password, email, id }))
                dispatch(setUser({ role, accessToken, name, password, email, id }))
            }

        }),

        getAllStudents: build.query({
            query: () => `/users/?role=student`,
        }
        )

    }),

})

export const { useUserLoginMutation, useUserRegisterMutation, useGetAllStudentsQuery } = userApi