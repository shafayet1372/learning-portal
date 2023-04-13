import React, { useEffect, useState } from 'react'
import { useUpdateAssignmentMarkMutation } from '../../../features/api/asssignmentApi';
import Swal from 'sweetalert2';

import { getDateFormate } from '../../../Utils/getDateFormat';



export default function SingleAssigmentMark({ data }) {
    const { id, student_name, title, repo_link, createdAt, status, mark, totalMark } = data
    const [updateAssignmentMark, { isSuccess: isUpdateSuccess, isError: isUpdateError }] = useUpdateAssignmentMarkMutation()
    const [assignmentMark, setAssignmentMark] = useState('')


    //if assignmenet mark update is successfull then show success alert
    useEffect(() => {
        if (isUpdateSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Mark Updated',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }, [isUpdateSuccess])

    //if assignment mark update throws error then show error alert
    useEffect(() => {
        if (isUpdateError) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }, [isUpdateError])



    const setMarkHandler = (e) => {

        setAssignmentMark(e.target.value)
    }

    //update assignment mark
    const updateMarkHandler = () => {
        //if assignment mark is greater than total mark then show error alert else update assignment mark
        if (parseInt(assignmentMark) > totalMark) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Mark can't be greater than ${totalMark}`,

            })
        } else {
            updateAssignmentMark({ id, data: { mark: parseInt(assignmentMark), status: 'published' } })
        }
    }
    return (
        <tr>
            <td className="table-td">{title}</td>
            <td className="table-td">{getDateFormate(createdAt)}</td>
            <td className="table-td">{student_name}</td>
            <td className="table-td"><a href={repo_link}>{repo_link}</a></td>
            <td className="table-td input-mark">
                {status == 'pending' ? <div className='flex flex-justify'>
                    <input type='number' value={assignmentMark} onChange={setMarkHandler} />
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                        className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
                        onClick={updateMarkHandler}
                    >
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div> : mark}

            </td>
        </tr>)
}
