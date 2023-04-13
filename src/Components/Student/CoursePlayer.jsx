import React, { useEffect, useState } from 'react'

import { useGetvediosQuery } from '../../features/api/videoApi'
import SingleListVideo from './SingleListVideo'
import { Outlet } from 'react-router-dom'
import { Navigate, useLocation, } from 'react-router-dom'
import NoDataAlert from '../Others/NoDataAlert'
import Loader from '../Others/Loader'
export default function CoursePlayer() {
    const { data, isSuccess, isLoading, isError } = useGetvediosQuery()
    const location = useLocation()
    const [activeVideo, setActiveVideo] = useState('')



    //if there is any video in the course and url is course-videos then redirect to the first video  
    if (data?.length > 0 && (location.pathname === '/course-videos' || location.pathname === '/course-videos/')) {

        return <Navigate to={`/course-videos/${data[0].id}`} />
    }




    const showContent = () => {
        if (isLoading) {
            return <Loader />
        }
        if (isSuccess && data?.length === 0) {
            return <NoDataAlert />
        }
        //if there is any video  and url is not /course-videos then show the current video page by id
        return <Outlet />
    }



    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    {showContent()}
                </div>

                {data?.length ? <div
                    className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">

                    {data.map((video) => <SingleListVideo key={video.id} video={video} />)}


                </div> : ''}
            </div>
        </div>
    </section>
}
