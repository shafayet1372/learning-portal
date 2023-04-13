import React from 'react'
import { useGetAssignmentMarkQuery } from '../../../features/api/asssignmentApi'
import SingleAssigmentMark from './SingleAssigmentMark'
import Loader from '../../Others/Loader'
import NoDataAlert from '../../Others/NoDataAlert'
export default function AssignmentMark() {

    const { data, error, isLoading, isSuccess } = useGetAssignmentMarkQuery(undefined, { refetchOnMountOrArgChange: true })

    const totalAssignment = data?.length ? data.length : 0
    const totalpending = data?.length ? data.filter(item => item.status === 'pending').length : 0
    const totalMarkSent = data?.length ? data.filter(item => item.status === 'published').length : 0

    const showAssigmentsMark = () => {
        //If its in loading state then show loader
        if (isLoading) {
            return <Loader />
        }
        //If request is successfull and data is not empty then show data
        if (isSuccess && data?.length > 0) {
            return data?.length ? data.map(mark => <SingleAssigmentMark data={mark} />) : ''
        }
        //If request is successfull and data is empty then show no data alert
        if (isSuccess && data?.length === 0) {
            return <NoDataAlert />
        }
    }
    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
            <div className="px-3 py-20 bg-opacity-10">
                <ul className="assignment-status">
                    <li>Total <span>{totalAssignment}</span></li>
                    <li>Pending <span>{totalpending}</span></li>
                    <li>Mark Sent <span>{totalMarkSent}</span></li>
                </ul>
                <div className="overflow-x-auto mt-4">
                    <table className="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th className="table-th">Assignment</th>
                                <th className="table-th">Date</th>
                                <th className="table-th">Student Name</th>
                                <th className="table-th">Repo Link</th>
                                <th className="table-th">Mark</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-600/50">

                            {showAssigmentsMark()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
}
