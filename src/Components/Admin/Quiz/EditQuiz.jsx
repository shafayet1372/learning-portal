
import React, { useEffect, useState } from 'react'
import { useGetSpecificQuizeQuery, useUpdateQuizeMutation } from '../../../features/api/quizeApi';
import { useGetvediosQuery } from '../../../features/api/videoApi';
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const initialState = {
    question: '',
    video_id: '',

}
//initial state for options
const options = [
    { id: 1, option: '', isCorrect: false },
    { id: 2, option: '', isCorrect: false },
    { id: 3, option: '', isCorrect: false },
    { id: 4, option: '', isCorrect: false }
]
export default function EditQuiz() {
    const { id } = useParams()
    const { data: videoData, isSuccess: isVideoSuccess, error } = useGetvediosQuery()
    const { data: quizeData, isSuccess: isQuizSuccess, error: isQuizError } = useGetSpecificQuizeQuery(id)
    const [updateQuize, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateQuizeMutation()
    const [values, setValues] = useState(initialState)
    const [videoLists, setVideoLists] = useState([])
    const [optionsList, setOptionsList] = useState(options)
    const navigate = useNavigate()


    //is fetching specific quize data is success then set values and options to the state
    useEffect(() => {
        if (isQuizSuccess) {
            const { question, video_id, options } = quizeData
            setValues({ question, video_id })
            setOptionsList(options)
        }
    }, [isQuizSuccess])


    //if video data is success then set video list to the state
    useEffect(() => {
        if (isVideoSuccess) {
            setVideoLists(videoData.map(video => ({ id: video.id, title: video.title })))
        }

    }, [isVideoSuccess])


    //if update quize is success then navigate to quize page and show toast message
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate('/admin/quize')
            toast('Quize updated Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });


        }
    }, [isUpdateSuccess])


    //if update quize is error then set values and options to the initial state and show toast message
    useEffect(() => {

        if (isUpdateError) {
            setValues(initialState)
            setOptionsList(options)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }


    }, [isUpdateError])





    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const getVideoTitle = (id) => {
        const video = videoLists.find(video => video.id === id)
        return video.title
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (optionsList.filter(option => option.isCorrect).length > 0) {
            updateQuize({
                id, data: {
                    ...values, options: optionsList,
                    video_id: parseInt(values.video_id),
                    video_title: getVideoTitle(parseInt(values.video_id))

                }
            })
        } else {
            Swal.fire({
                text: "please select the correct option ",
                icon: "warning",
            })
        }
        // addAssignment({ ...values, video_id: parseInt(values.video_id), video_title: getVideoTitle(parseInt(values.video_id)) })

    }

    const optionsHandler = (e, id) => {
        let option = optionsList.slice()
        let findOption = option.findIndex(option => option.id === id)
        option[findOption].option = e.target.value
        setOptionsList(option)
    }


    const correctOptionHandler = (id) => {

        let option = optionsList.slice().map(option => ({ ...option, isCorrect: false }))
        let findOption = option.findIndex(option => option.id === id)
        if (values.question !== '' && option[findOption].option !== '') {
            option[findOption].isCorrect = !option[findOption].isCorrect
            setOptionsList(option)


        } else if (!values.question && !option[findOption].option) {
            Swal.fire({
                text: "please fill the question first and the option",
                icon: "warning",
            })

        } else if (!option[findOption].option) {
            Swal.fire({
                text: "please fill the option",
                icon: "warning",
            })
        } else if (!values.question) {
            Swal.fire({
                text: "please fill the question",
                icon: "warning",
            })
        }
    }


    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">


                <h2 className="text-2xl font-bold">Update Quize</h2>
            </div>
            <div className="container mx-auto flex justify-center">

                <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ width: '600px' }} onSubmit={submitHandler}>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="type">
                            Select Video
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="type"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
                            }}
                            name='video_id'
                            required
                            value={values.video_id}
                            onChange={inputHandler}
                        >

                            {videoLists?.length ? videoLists.map(video => <option key={video.id} value={video.id} selected={video.id == values.video_id}>{video.title}</option>) : ''}

                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="question">
                            Question
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="question"
                            type="text"
                            placeholder="Enter question"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
                            }}
                            name='question'
                            required
                            value={values.question}
                            onChange={inputHandler}
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="question">
                            Option
                        </label>
                        {optionsList?.length ? optionsList.map((option, index) => <div key={option.id} className=" flex items-center">

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="option"
                                type="text"
                                placeholder={`Enter option ${index + 1}`}
                                style={{
                                    backgroundColor: "#080E1B",
                                    border: "1px solid white",
                                }}
                                name='option'
                                required
                                value={option.option}
                                onChange={(e) => optionsHandler(e, option.id)}
                            />
                            <button type="button" className=" hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2" style={option.isCorrect ? { color: "green" } : { color: 'white' }}
                                onClick={() => correctOptionHandler(option.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                                    <path d="M10 0C4.476 0 0 4.477 0 10s4.476 10 10 10 10-4.477 10-10S15.524 0 10 0zm4.293 7.293l-6 6a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L7 11.586l5.293-5.293a1 1 0 1 1 1.414 1.414z" />
                                </svg>
                            </button>
                        </div>
                        ) : ''}


                    </div>

                    <div className="flex items-center justify-between">
                        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md" style={{
                            backgroundColor: "#12B886",

                        }}>Update Quiz</button>

                    </div>
                </form>
            </div>




        </div>



    </section>

}
