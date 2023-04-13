import React, { useEffect, useState } from 'react'
import { useGetSpecificVideoQuery, useUpdateVedioMutation } from '../../../features/api/videoApi'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const initialState = {
    title: '',
    description: '',
    url: '',
    views: '',
    duration: ''
}
export default function EditVideo() {
    const { id } = useParams()
    const { data, error, isSuccess, isError } = useGetSpecificVideoQuery(id)
    const [updateVedio, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateVedioMutation()
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    //If specific video data is success then set the values to the state
    useEffect(() => {
        if (isSuccess) {
            const { title, description, url, views, duration } = data
            setValues({ title, description, url, views, duration })
        }
    }, [isSuccess])


    //if update is success then navigate to the videos page and show the successful toast
    useEffect(() => {
        if (isUpdateSuccess) {

            navigate('/admin/videos')
            toast('Vedio updated Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });
        }
    }, [isUpdateSuccess])

    //if update is error then set the values to the initial state and show the error toast
    useEffect(() => {

        if (isUpdateError) {
            setValues(initialState)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }


    }, [isUpdateError])


    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    //update the video
    const submitHandler = (e) => {
        e.preventDefault()
        updateVedio({ id, data: values })

    }


    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">
                <h2 className="text-2xl font-bold">Update Video</h2>
            </div>
            <div className="container mx-auto flex justify-center">

                <form className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
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
                    <div className="mb-4 h-500">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 h-full  text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="text"
                            placeholder="Enter description"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
                                height: "200px",
                            }}
                            name='description'
                            required
                            value={values.description}
                            onChange={inputHandler}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="video">
                            Video URL
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="video"
                            type="url"
                            placeholder="Enter video URL"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
                            }}
                            onChange={inputHandler}
                            name='url'
                            pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                            required
                            value={values.url}
                        />
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="views"
                            >
                                Views
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="views"
                                type="text"
                                placeholder="Enter views"
                                style={{
                                    backgroundColor: "#080E1B",
                                    border: "1px solid white",
                                }}
                                value={values.views}
                                onChange={inputHandler}
                                name='views'
                                required
                            />
                        </div>
                        <div className="w-1/2 ml-2">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="duration"
                            >
                                Duration
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                                id="duration"
                                type="text"
                                placeholder="Enter duration"
                                style={{
                                    backgroundColor: "#080E1B",
                                    border: "1px solid white",
                                }}
                                value={values.duration}
                                onChange={inputHandler}
                                name='duration'
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md" style={{
                            backgroundColor: "#12B886",

                        }}>update Video</button>

                    </div>
                </form>
            </div>




        </div>



    </section>


}
