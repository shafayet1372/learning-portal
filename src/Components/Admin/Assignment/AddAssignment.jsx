
import React, { useEffect, useState } from 'react'
import { useGetvediosQuery } from '../../../features/api/videoApi';
import { useAddAssignmentMutation, useGetAssignmentsQuery } from '../../../features/api/asssignmentApi';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const initialState = {
    title: '',
    video_id: '',
    totalMark: ''
}
export default function AddAssignment() {
    const { data, isSuccess: isVideoSuccess, error } = useGetvediosQuery()
    const [addAssignment, { isSuccess: isAssignmentSuccess, isError: isAssignmentError }] = useAddAssignmentMutation()
    const { data: assignmentData } = useGetAssignmentsQuery()
    const [values, setValues] = useState(initialState)
    const [videoLists, setVideoLists] = useState([])

    const navigate = useNavigate()


    //if video data is success then set video list
    useEffect(() => {
        if (isVideoSuccess) {
            setVideoLists(data.map(video => ({ id: video.id, title: video.title })))
        }

    }, [isVideoSuccess])


    //if adding assignment is success then navigate to assignment page with toast

    useEffect(() => {
        if (isAssignmentSuccess) {
            navigate('/admin/assignment')
            toast('Assignment added Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });

        }
    }, [isAssignmentSuccess])


    //if adding assignment is error then set values to initial state and show alert
    useEffect(() => {

        if (isAssignmentError) {
            setValues(initialState)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }


    }, [isAssignmentError])



    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    //get video title by id for setting video title in assignment
    const getVideoTitle = (id) => {
        const video = videoLists.find(video => video.id === id)
        return video.title
    }
    const submitHandler = (e) => {
        e.preventDefault()
        addAssignment({ ...values, video_id: parseInt(values.video_id), video_title: getVideoTitle(parseInt(values.video_id)), totalMark: parseInt(values.totalMark) })

    }


    //check if any video is already assigned to assignment or not
    const getVideoAlreadyAssignedToAssignment = (id) => {
        return assignmentData.some(assign => assign.video_id === id)
    }




    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">
                <h2 className="text-2xl font-bold">Add Assignment</h2>
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
                            <option value="" disabled selected>Select an video </option>
                            {videoLists?.length ? videoLists.map(video => <option disabled={getVideoAlreadyAssignedToAssignment(video.id)} key={video.id} value={video.id}>{video.title}</option>) : ''}

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

                        }}>Add Assignment</button>

                    </div>
                </form>
            </div>




        </div>



    </section>

}
