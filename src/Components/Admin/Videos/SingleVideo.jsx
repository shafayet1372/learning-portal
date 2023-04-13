import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useDeleteVedioMutation } from '../../../features/api/videoApi'
import { useGetAssignmentsQuery } from '../../../features/api/asssignmentApi'
import { useDeleteAssignmentMutation } from '../../../features/api/asssignmentApi'
import { useGetQuizzesQuery, useDeleteQuizeMutation } from '../../../features/api/quizeApi'
import { Link } from 'react-router-dom'
export default function SingleVedio({ data }) {
    const [deleteVedio, { isSuccess: isDeleteVideoSuccess, isError: isDeleteError }] = useDeleteVedioMutation()
    const { data: assignments, isSuccess: isAssignmentSuccess } = useGetAssignmentsQuery()
    const [deleteAssignment, { isSuccess: isDeleteAssignmentSuccess }] = useDeleteAssignmentMutation()
    const { data: quizes, isSuccess: isQuizeSuccess } = useGetQuizzesQuery()
    const [deleteQuize, { isSuccess: isDeleteQuizeSuccess }] = useDeleteQuizeMutation()
    const { title, description, id } = data


    //If delete video success then delete related assignments and quizzes
    useEffect(() => {

        if (isDeleteVideoSuccess) {
            Swal.fire({
                text: "Vedio deleted successfully",
                icon: "success",
            })

            //Getting related asssignments id with video id
            let relatedAssignments = getAssignmentIds(assignments).map(assignmentId => {
                return async () => {
                    deleteAssignment(assignmentId)
                }

            })

            //Getting related quizess Id with video id
            let relatedQuizzes = getQuizzesIds(quizes).map(quizeId => {
                return async () => {
                    deleteQuize(quizeId)
                }

            })

            //Deleting related assignments and quizzes at a time
            Promise.all([...relatedQuizzes, ...relatedAssignments].map(p => p())).then((data) => {

            }).catch(e => Swal.fire({
                text: "Something went wrong",
                icon: "error",
            }))

        }

    }, [isDeleteVideoSuccess])

    //if delete request error then show error message
    useEffect(() => {
        if (isDeleteError) {
            Swal.fire({
                text: "Something went wrong",
                icon: "error",
            })
        }
    }, [isDeleteError])


    //Deleting video with confirmation message
    const deleteHandler = () => {
        Swal.fire({
            title: 'Do you really want to delete it?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVedio(id)
            }
        })

    }

    //filtering related quizzess  with video id
    const getQuizzesIds = (quizes) => {
        return quizes.filter(quize => quize.video_id === id).map(quize => quize.id)
    }

    //filtering related assignments  with video id
    const getAssignmentIds = (assignments) => {
        return assignments.filter(assignment => assignment.video_id === id).map(assignment => assignment.id)
    }

    return <tr>
        <td className="table-td">{title}</td>
        <td className="table-td">{description.substr(0, 50) + '....'}</td>
        <td className="table-td flex gap-x-2">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all" onClick={deleteHandler}>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <Link to={`/admin/edit-video/${id}`}>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg></Link>

        </td>
    </tr>
}
