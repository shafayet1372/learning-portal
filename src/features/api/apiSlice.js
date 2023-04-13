// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import baseUrl from '../../Utils/https'
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: () => ({}),
})




export const { useGetPokemonByNameQuery } = apiSlice