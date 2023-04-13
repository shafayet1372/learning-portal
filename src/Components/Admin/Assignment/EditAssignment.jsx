import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSpecificAssignmentQuery, useUpdateAssignmentMutation, useGetAssignmentsQuery } from '../../../features/api/asssignmentApi'
import { useGetvediosQuery } from '../../../features/api/videoApi'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
const initialState = {
    title: '',
    video_id: '',
    totalMark: ''
}


export default function EditAssignment() {
    const { id } = useParams()
    const { data: videoData, isSuccess: isVideoSuccess } = useGetvediosQuery()
    const { data: assignmentData, error, isSuccess: isAssignmentSuccess, isError } = useGetSpecificAssignmentQuery(id)
    const [updateAssignment, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateAssignmentMutation()
    const { data: allAssignmentData = [], isSuccess: isAllAssignmentSuccess } = useGetAssignmentsQuery()
    const [values, setValues] = useState(initialState)
    const [videoLists, setVideoLists] = useState([])

    const navigate = useNavigate()



    //if Assignment is success then set the values to the state
    useEffect(() => {
        if (isAssignmentSuccess) {
            const { title, video_id, totalMark } = assignmentData
            setValues({ title, video_id, totalMark })
        }
    }, [isAssignmentSuccess])

    //if fetching video is success then set the video list to the state
    useEffect(() => {
        if (isVideoSuccess) {
            setVideoLists(videoData.map(video => ({ id: video.id, title: video.title })))
        }

    }, [isVideoSuccess])


    //if assignment is updated successfully then navigate to the assignment page and show the toast
    useEffect(() => {
        if (isUpdateSuccess) {

            navigate('/admin/assignment')
            toast('Assignment updated Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });
        }
    }, [isUpdateSuccess])

    //if assignment update trows error then set the values to the initial state and show the toast
    useEffect(() => {

        if (isUpdateError) {
            setValues(initialState)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }
    }, [isUpdateError])


    //get the video title by id for setting the video title to assignment in database
    const getVideoTitle = (id) => {
        const video = videoLists.find(video => video.id === id)
        return video.title
    }


    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {

        console.log(values)
        e.preventDefault()
        updateAssignment({ id, data: { ...values, video_id: parseInt(values.video_id), video_title: getVideoTitle(parseInt(values.video_id)) } })

    }
    //check if the video is already assigned to the assignment or not
    const getVideoAlreadyAssignedToAssignment = (id) => {
        return allAssignmentData.some(assign => assign.video_id === id)
    }

    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">
                <h2 className="text-2xl font-bold">Update Assignment</h2>
            </div>
            <div className="container mx-auto flex justify-center">

                <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" style={{ width: '600px' }} onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
                            }}
                            name='title'
                            required
                            value={values.title}
                            onChange={inputHandler}
                        />
                    </div>

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

                            {videoLists?.length ? videoLists.map(video =>

                                <option key={video.id} value={video.id}
                                    selected={video.id == values.video_id}
                                    disabled={getVideoAlreadyAssignedToAssignment(video.id)}

                                >{video.title}</option>)

                                : ''}

                        </select>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="mark"
                            >
                                Total Mark
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="mark"
                                type="number"
                                placeholder="Enter mark"
                                style={{
                                    backgroundColor: "#080E1B",
                                    border: "1px solid white",
                                }}
                                value={values.totalMark}
                                onChange={inputHandler}
                                name='totalMark'
                                required
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-between">
                        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md" style={{
                            backgroundColor: "#12B886",

                        }}>Update Assignment</button>

                    </div>
                </form>
            </div>




        </div>



    </section>
}
