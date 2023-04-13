import { apiSlice } from "./apiSlice"

const assignmentApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAssignments: build.query({
            query: () => '/assignments',
        }),
        getSpecificAssignment: build.query({
            query: (id) => `/assignments/${id}`,
        }),

        getRelatedAssignment: build.query({
            query: (id) => `/assignments?video_id=${id}`,
        }),
        addAssignment: build.mutation({
            query: (body) => ({
                url: '/assignments',
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {

                try {
                    const result = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
                        draft.push(result.data)
                    }))

                } catch (error) {

                }
            }
        }),
        deleteAssignment: build.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: 'DELETE',

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {

                try {
                    const result = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, (draft) => {
                        let findIndex = draft.findIndex((item) => item.id.toString() === arg.toString())
                        draft.splice(findIndex, 1)
                    }))
                } catch (error) {

                }
            }
        }),
        updateAssignment: build.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: 'PATCH',
                body: data

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {


                try {
                    const result = await queryFulfilled
                    const mutateAssignmentData = (data) => {
                        console.log(result.data)
                        const { title, video_id, video_title, totalMark } = result.data
                        data.title = title
                        data.video_id = video_id
                        data.video_title = video_title
                        data.totalMark = totalMark

                    }
                    const updateData = draft => {
                        let findData = draft.find((item) => item.id.toString() === arg.id)
                        mutateAssignmentData(findData)

                    }
                    dispatch(apiSlice.util.updateQueryData('getAssignments', undefined, updateData))
                    dispatch(apiSlice.util.updateQueryData('getSpecificAssignment', arg.id, mutateAssignmentData))

                } catch (error) {

                }
            }
        }),

        updateAssignmentMark: build.mutation({
            query: ({ id, data }) => ({
                url: `/assignmentMark/${id}`,
                method: 'PATCH',
                body: data

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {


                try {
                    const result = await queryFulfilled
                    const mutateAssignmentMarkData = (data) => {
                        console.log(result.data)
                        const { mark, status } = result.data
                        data.mark = mark
                        data.status = status

                    }

                    const updateData = draft => {
                        let findData = draft.find((item) => item.id.toString() === arg.id.toString())
                        mutateAssignmentMarkData(findData)

                    }
                    dispatch(apiSlice.util.updateQueryData('getAssignmentMark', undefined, updateData))


                } catch (error) {

                }
            }
        }),
        getAssignmentMark: build.query({
            query: () => '/assignmentMark',
        }),

        getSpecificStudentAssignmentMark: build.query({
            query: (student_id) => `/assignmentMark?student_id=${student_id}`,
        }),

        addAssignmentMark: build.mutation({
            query: (body) => ({
                url: '/assignmentMark',
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {

                try {
                    const result = await queryFulfilled



                } catch (error) {

                }
            }
        }),
    }),

})

export const { useGetAssignmentsQuery, useGetAssignmentMarkQuery, useAddAssignmentMutation, useDeleteAssignmentMutation, useGetSpecificAssignmentQuery, useUpdateAssignmentMutation, useUpdateAssignmentMarkMutation, useGetRelatedAssignmentQuery, useAddAssignmentMarkMutation, useGetSpecificStudentAssignmentMarkQuery } = assignmentApi