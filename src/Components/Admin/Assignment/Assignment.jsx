import React from 'react'
import { useGetAssignmentsQuery } from '../../../features/api/asssignmentApi'
import SingleAssignment from './SingleAssignment'
import { Link } from 'react-router-dom'
import Loader from '../../Others/Loader'
import NoDataAlert from '../../Others/NoDataAlert'
export default function Assignment() {

    let { data, isLoading, error, isSuccess } = useGetAssignmentsQuery()
    const showAssigments = () => {
        //If its in loading state then show loader
        if (isLoading) {
            return <Loader />
        }
        //If request is successfull and data is not empty then show data
        if (isSuccess && data?.length > 0) {
            return data?.length ? data.map(assignment => <SingleAssignment data={assignment} />) : ''
        }
        //If request is successfull and data is empty then show no data alert
        if (isSuccess && data?.length === 0) {
            return <NoDataAlert />
        }
    }
    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <div className="w-full flex">
                    <Link className="btn ml-auto" to='/admin/add-assignment'>Add Assignment</Link>
                </div>
                <div className="overflow-x-auto mt-4">
                    <table className="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th className="table-th">Title</th>
                                <th className="table-th">Video Title</th>
                                <th className="table-th">Mark</th>
                                <th className="table-th">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-600/50">

                            {showAssigments()}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section >
}
