import React, { useEffect, useState } from 'react'
import { useAddVedioMutation } from '../../../features/api/videoApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';

const initialState = {
    title: '',
    description: '',
    url: '',
    views: '',
    duration: ''
}
export default function AddVideos() {
    const [addVedio, { isLoading, error, isSuccess, isError }] = useAddVedioMutation()
    const [values, setValues] = useState(initialState)
    const navigate = useNavigate()

    //If request is success then navigate to admin/videos with success message
    useEffect(() => {
        if (isSuccess) {
            navigate('/admin/videos')
            toast('Vedio added Successfully!', {
                position: "top-right",
                autoClose: 2000,
                type: "success",
                theme: "light",
            });

        }
    }, [isSuccess])



    //If request is failed then show error message
    useEffect(() => {

        if (isError) {
            setValues(initialState)
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })


        }


    }, [isError])



    const inputHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    //submiting video data
    const submitHandler = (e) => {
        e.preventDefault()
        addVedio({ ...values, createdAt: new Date().toISOString() })

    }



    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="bg-green-500 text-white text-center py-4">
                <h2 className="text-2xl font-bold">Add Video</h2>
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
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            type="text"
                            placeholder="Enter description"
                            style={{
                                backgroundColor: "#080E1B",
                                border: "1px solid white",
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

                        }}>Add Video</button>

                    </div>
                </form>
            </div>




        </div>



    </section>


}
