import { apiSlice } from "./apiSlice"

const quizeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        getQuizzes: build.query({
            query: () => '/quizzes',
        }),
        getSpecificQuize: build.query({
            query: (id) => `/quizzes/${id}`,
        }),

        addQuize: build.mutation({
            query: (body) => ({
                url: '/quizzes',
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {

                try {
                    const result = await queryFulfilled
                    dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
                        draft.push(result.data)
                    }))
                } catch (error) {

                }
            }
        }),

        updateQuize: build.mutation({
            query: ({ id, data }) => ({
                url: `/quizzes/${id}`,
                method: 'PATCH',
                body: data

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, queryFailed, requestId }) {


                try {
                    const result = await queryFulfilled
                    const mutateQuizeData = (data) => {
                        const { question, video_id, video_title, options } = result.data
                        data.question = question
                        data.video_id = video_id
                        data.video_title = video_title
                        data.options = options

                    }
                    const updateData = draft => {
                        let findData = draft.find((item) => item.id.toString() === arg.id.toString())
                        mutateQuizeData(findData)

                    }
                    dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, updateData))
                    dispatch(apiSlice.util.updateQueryData('getSpecificQuize', arg.id, mutateQuizeData))

                } catch (error) {

                }
            }
        }),
        deleteQuize: build.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: 'DELETE',

            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {

                try {
                    const result = await queryFulfilled



                    dispatch(apiSlice.util.updateQueryData('getQuizzes', undefined, (draft) => {
                        let findIndex = draft.findIndex((item) => item.id.toString() === arg.toString())
                        draft.splice(findIndex, 1)
                    }))
                } catch (error) {

                }
            }
        }),

        getSpecificVideoQuize: build.query({
            query: (id) => `/quizzes?video_id=${id}`,
        }),
        getQuizeMarks: build.query({
            query: () => `/quizMark`,
        }),
        getStudentQuizeMark: build.query({

            query: ({ video_id, student_id }) => `/quizMark?video_id=${video_id}&student_id=${student_id}`,
        }),

        addQuizeMark: build.mutation({
            query: (body) => ({
                url: '/quizMark',
                method: 'POST',
                body,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled, requestId }) {


                try {
                    const result = await queryFulfilled

                    // dispatch(apiSlice.util.updateQueryData('getQuizeMarks', undefined, (draft) => {
                    //     draft.push(result.data)
                    // }))


                } catch (error) {

                }
            }
        }),



        getRelatedVideoQuize: build.query({

            query: (id) => `/quizzes?video_id=${id}`,
        })

    }),

})

export const { useGetQuizzesQuery, useAddQuizeMutation, useDeleteQuizeMutation, useGetSpecificQuizeQuery, useUpdateQuizeMutation, useGetSpecificVideoQuizeQuery, useAddQuizeMarkMutation, useGetStudentQuizeMarkQuery, useGetRelatedVideoQuizeQuery, useGetQuizeMarksQuery } = quizeApi