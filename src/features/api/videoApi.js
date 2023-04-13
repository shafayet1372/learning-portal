import { apiSlice } from "./apiSlice"

const videoApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getvedios: build.query({
            query: () => '/videos',
        }),
        getSpecificVideo: build.query({
            query: (id) => `/videos/${id}`,
        }),
        addVedio: build.mutation({
            query: (body) => ({
                url: '/videos',
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, queryFailed, requestId }) {

                try {
                    const result = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getvedios', undefined, (draft) => {
                        draft.push(result.data)
                    }))
                } catch (error) {

                }
            }
        }),
        deleteVedio: build.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, queryFailed, requestId }) {

                try {
                    const result = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getvedios', undefined, (draft) => {
                        let findIndex = draft.findIndex((item) => item.id.toString() === arg.toString())
                        draft.splice(findIndex, 1)
                    }))
                } catch (error) {

                }
            }
        }),

        updateVedio: build.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, queryFailed, requestId }) {


                try {
                    const result = await queryFulfilled
                    const mutateVideoData = (data) => {
                        const { title, description, url, views, duration } = result.data
                        data.title = title
                        data.description = description
                        data.url = url
                        data.views = views
                        data.duration = duration
                    }
                    const updateData = draft => {
                        let findData = draft.find((item) => item.id.toString() === arg.id.toString())
                        mutateVideoData(findData)

                    }
                    dispatch(apiSlice.util.updateQueryData('getvedios', undefined, updateData))
                    dispatch(apiSlice.util.updateQueryData('getSpecificVideo', arg.id.toString(), mutateVideoData))

                } catch (error) {

                }
            }
        }),

    }),

})

export const { useGetvediosQuery, useAddVedioMutation, useDeleteVedioMutation, useGetSpecificVideoQuery, useUpdateVedioMutation } = videoApi