
import React, { useEffect, useState } from 'react'
import { useGetvediosQuery } from '../../../features/api/videoApi';
import { useAddQuizeMutation } from '../../../features/api/quizeApi';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import _ from 'lodash';
const initialState = {
    question: '',
    video_id: '',

}

//initial state for quize options
const options = [
    { id: 1, option: '', isCorrect: false },
    { id: 2, option: '', isCorrect: false },
    { id: 3, option: '', isCorrect: false },
    { id: 4, option: '', isCorrect: false }
]
export default function AddQuiz() {
    const { data, isSuccess: isVideoSuccess, error } = useGetvediosQuery()
    const [addQuiz, { isSuccess: isQuizSuccess, isError: isQuizError }] = useAddQuizeMutation()
    const [values, setValues] = useState(initialState)
    const [videoLists, setVideoLists] = useState([])
    const [optionsList, setOptionsList] = useState(_.cloneDeep(options))
    const navigate = useNavigate()

    console.log(options)

    //If video data is successfull then set video list
    useEffect(() => {
        if (isVideoSuccess) {
            setVideoLists(data.map(video => ({ id: video.id, title: video.title })))
        }

    }, [isVideoSuccess])



    //if quize is added successfully then navigate to quize list page with success message
    useEffect(() => {
        if (isQuizSuccess) {
            navigate('/admin/quize')
            toast('Quize added Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });

        }
    }, [isQuizSuccess])


    //if quiz adding throw error then set values to intial ,options to intials and show error message
    useEffect(() => {

        if (isQuizError) {
            setValues(initialState)
            setOptionsList(options)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }


    }, [isQuizError])






    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    //get video title by id for set video title in quize
    const getVideoTitle = (id) => {
        const video = videoLists.find(video => video.id === id)
        return video.title
    }
    const submitHandler = (e) => {
        e.preventDefault()
        //if there are at lear one correct option then add quiz else show error message
        if (optionsList.filter(option => option.isCorrect).length > 0) {
            addQuiz({
                ...values, options: optionsList,
                video_id: parseInt(values.video_id),
                video_title: getVideoTitle(parseInt(values.video_id))

            })
            setValues(initialState)
            setOptionsList(options)
        } else {
            Swal.fire({
                text: "please select the correct option ",
                icon: "warning",
            })
        }
        // addAssignment({ ...values, video_id: parseInt(values.video_id), video_title: getVideoTitle(parseInt(values.video_id)) })

    }


    //set option value to the current option in the options list
    const optionsHandler = (e, id) => {
        let option = optionsList.slice()
        let findOption = option.findIndex(option => option.id === id)
        option[findOption].option = e.target.value
        setOptionsList(option)
    }


    const correctOptionHandler = (id) => {

        let option = optionsList.slice().map(option => ({ ...option, isCorrect: false }))
        let findOption = option.findIndex(option => option.id === id)
        //if question and specific option is not empty then set isCorrect to true else show error message
        if (values.question !== '' && option[findOption].option !== '') {
            option[findOption].isCorrect = !option[findOption].isCorrect
            setOptionsList(option)


        } else if (!values.question && !option[findOption].option) { //if question and option is empty then show error message
            Swal.fire({
                text: "please fill the question first and the option",
                icon: "warning",
            })

        } else if (!option[findOption].option) { //if question is not empty and option is empty then show error message
            Swal.fire({
                text: "please fill the option",
                icon: "warning",
            })
        } else if (!values.question) {   //if option is not empty and question is empty then show error message
            Swal.fire({
                text: "please fill the question",
                icon: "warning",
            })
        }
    }


    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">


                <h2 className="text-2xl font-bold">Add Quiz</h2>
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
                            <option value="" disabled selected>Select an video </option>
                            {videoLists?.length ? videoLists.map(video => <option key={video.id} value={video.id}>{video.title}</option>) : ''}

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
                        {optionsList.map((option, index) => <div key={option.id} className=" flex items-center">

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
                        )}


                    </div>

                    <div className="flex items-center justify-between">
                        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md" style={{
                            backgroundColor: "#12B886",

                        }}>Add Quiz</button>

                    </div>
                </form>
            </div>




        </div>



    </section>

}
