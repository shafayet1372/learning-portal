import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSpecificVideoQuery } from '../../features/api/videoApi'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedVideo } from '../../features/video/videoSlice'
import { useGetRelatedAssignmentQuery, useAddAssignmentMarkMutation, useGetSpecificStudentAssignmentMarkQuery } from '../../features/api/asssignmentApi'
import { useGetStudentQuizeMarkQuery, useGetRelatedVideoQuizeQuery } from '../../features/api/quizeApi'
import NoVideoError from './NoVideoError'
import { getDateFormate } from '../../Utils/getDateFormat'
import AssignmentModal from './AssignmentModal'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function CurrentVideo({ video }) {
    const { id } = useParams()
    const { data = {}, isLoading, isSuccess, isError } = useGetSpecificVideoQuery(id)
    const { data: relatedAssignment } = useGetRelatedAssignmentQuery(id, { refetchOnMountOrArgChange: true })
    const { data: relatedQuize } = useGetRelatedVideoQuizeQuery(id, { refetchOnMountOrArgChange: true })
    const [addAssignmentMark, { isSuccess: isAssignmentMarkSuccess, isError: isAssignmentMarkError }] = useAddAssignmentMarkMutation()
    const { title, description, url, views, duration, createdAt } = data
    const { name: student_name, id: student_id } = useSelector(state => state.user.user)
    const { data: studentAssignmentMark, refetch } = useGetSpecificStudentAssignmentMarkQuery(student_id)
    const { data: studentQuizeMark } = useGetStudentQuizeMarkQuery({ student_id, video_id: id }, { refetchOnMountOrArgChange: true })
    const [modal, setModal] = useState(false)
    const [skip, setSkip] = useState(true)
    const dispatch = useDispatch()



    useEffect(() => {
        if (data?.id) {
            dispatch(setSelectedVideo(data?.id))
        }
    }, [data])

    useEffect(() => {
        if (isAssignmentMarkSuccess) {

            refetch()
            Swal.fire({
                title: 'Success',
                text: 'Assignment Submitted Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        }

    }, [isAssignmentMarkSuccess])




    if (isLoading) {
        return <NoVideoError isLoading={isLoading}>Loading...</NoVideoError>
    }



    if (!isLoading && isError) {
        return <NoVideoError  >  The video is not available or not uploaded yet.</NoVideoError>
    }

    //checking if the current video has any assignment
    const hasVideoAssignment = () => {
        return relatedAssignment?.length > 0
    }

    //checking if the current video has any quize
    const hasVideoQuize = () => {
        return relatedQuize?.length > 0
    }


    //checking the current user already submitted the assignment
    const hasUserSubmittedAssignment = () => {

        if (relatedAssignment?.length > 0 && studentAssignmentMark?.length > 0) {
            return studentAssignmentMark?.some(assignment => assignment.assignment_id === relatedAssignment[0].id)
        }
    }
    const modalHandler = (e) => {
        e.preventDefault()

        //if the user already submitted the assignment then show the error message
        if (hasUserSubmittedAssignment()) {
            Swal.fire({
                title: 'Error',
                text: 'You have already submitted this assignment',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            return null
        }

        setModal(!modal)
    }


    //ssubmitting the assignment
    const assignmentSubmitHandler = (value) => {

        const { id: assignment_id, title, totalMark } = relatedAssignment[0]
        addAssignmentMark({
            student_id,
            student_name,
            assignment_id,
            title,
            createdAt: new Date().toISOString(),
            totalMark,
            mark: 0,
            repo_link: value,
            status: "pending"
        })
        setModal(!modal)
    }


    return <div>
        <iframe width="100%" className="aspect-video" src={url + "?autoplay=1&mute=1"}
            title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
            frameborder="0"

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>

        <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                {title}

            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                Uploaded on {getDateFormate(createdAt)}</h2>

            <div className="flex gap-4">
                {hasVideoAssignment() && <a href="#"

                    onClick={modalHandler}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                    এসাইনমেন্ট
                </a>}

                {!hasVideoQuize() ? <div className="px-3 font-bold py-1 border border-grey text-grey rounded-full text-sm ">
                    কুইজ নেই
                </div> : studentQuizeMark?.length > 0 ? <div className="px-3 font-bold py-1 border border-grey text-grey rounded-full text-sm ">
                    কুইজ দিয়েছেন
                </div> : <Link to={`/quize/video/${id}`}
                    className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                    অংশগ্রহণ
                    করুন</Link>}

            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
                {description}
            </p>


        </div>

        <AssignmentModal modal={modal} modalHandler={modalHandler} assignmentSubmitHandler={assignmentSubmitHandler} />

    </div>
}
