import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSpecificVideoQuizeQuery, useAddQuizeMarkMutation, useGetStudentQuizeMarkQuery } from '../../features/api/quizeApi'
import { useGetSpecificVideoQuery } from '../../features/api/videoApi'
import SingleQuiz from './SingleQuiz'
import { useDispatch, useSelector } from 'react-redux'
import { setQuizeOptions, resetQuizeOptions } from '../../features/quize/quizeSlice'

import Swal from 'sweetalert2'
const mark = 5
export default function Quiz() {
    const { id } = useParams()
    const { data: quizeData, isSuccess: isVideoQuizeSuccess } = useGetSpecificVideoQuizeQuery(id)
    const { data: videoData, isSuccess: isVideoSuccess } = useGetSpecificVideoQuery(id)
    const [addQuizeMark, { isSuccess: isAddQuizeMarkSuccess }] = useAddQuizeMarkMutation()
    const { quizes: quizeOptions } = useSelector(state => state.quize)
    const { id: student_id, name: student_name } = useSelector(state => state.user.user)

    const dispatch = useDispatch()
    const { data: studentQuizeMark, isSuccess: isStudentMarkSuccess } = useGetStudentQuizeMarkQuery({ student_id, video_id: id }, { refetchOnMountOrArgChange: true })
    const navigate = useNavigate()


    useEffect(() => {
        return () => {
            dispatch(resetQuizeOptions([]))
        }
    }, [])

    useEffect(() => {

        //checking if the student has already taken the quiz or not
        if (isStudentMarkSuccess && studentQuizeMark?.length > 0) {
            Swal.fire({
                text: `You have already taken this quiz`,
                icon: "error",
            });
            navigate(`/course-videos/${id}`)
        }
    }, [isStudentMarkSuccess, id])


    useEffect(() => {
        //showing the quize mark after submitting the quiz
        if (isAddQuizeMarkSuccess) {
            Swal.fire({
                text: `Your Mark is ${totalCorrectQuiz * mark} for ${videoData?.title}`,
                icon: "success",
            });
            navigate('/leaderboard')

        }
    }, [isAddQuizeMarkSuccess])

    //getting the total correct quize
    const totalCorrectQuiz = quizeOptions.filter(quize => quize.isCorrect).length



    //submitting the quiz
    const quizSubmitHanlder = (e) => {
        e.preventDefault()
        //if user comes back to this page after submitting the quiz again then show the error message
        if (isStudentMarkSuccess && studentQuizeMark?.length > 0) {
            Swal.fire({
                text: `You have already taken this quiz`,
                icon: "error",
            });
            navigate(`/course-videos/${id}`)
            return null
        }
        //if all  of the quize is not answered then show the error message
        if (quizeOptions.length !== quizeData.length) {
            Swal.fire({
                text: `Please answer all the questions`,
                icon: "error",
            });
            return null
        }
        //if user didnt submit this quize and answered all the questions then add the quize mark
        addQuizeMark({
            student_id,
            student_name,
            video_id: videoData.id,
            video_title: videoData.title,
            totalQuize: quizeData.length,
            totalCorrect: totalCorrectQuiz,
            totalWrong: quizeData.length - totalCorrectQuiz,
            totalMark: quizeData.length * mark,
            mark: totalCorrectQuiz * mark

        })

    }
    return <section className="py-6 bg-primary">
        <div class="mx-auto max-w-7xl px-5 lg:px-0">
            <div class="mb-8">
                <h1 class="text-2xl font-bold">Quizzes for {videoData?.title}
                </h1>
                <p class="text-sm text-slate-200">Each question contains 5 Mark</p>
            </div>
            <div class="space-y-8 ">

                {quizeData?.length > 0 ? quizeData.map((quize) => <SingleQuiz key={quize.id} quize={quize} />) : ''}

            </div>

            <button
                class="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 " onClick={quizSubmitHanlder}>Submit</button>
        </div>
    </section>
}
