import React from 'react'
import { useGetQuizeMarksQuery } from '../../features/api/quizeApi'
import { useGetAllStudentsQuery } from '../../features/api/userApi'
import { useGetAssignmentMarkQuery } from '../../features/api/asssignmentApi'
import { useSelector } from 'react-redux'
export default function LeaderBoard() {
    const { data: quizeMarks = [] } = useGetQuizeMarksQuery(undefined, { refetchOnMountOrArgChange: true })
    const { data: allStudents = [] } = useGetAllStudentsQuery(undefined, { refetchOnMountOrArgChange: true })
    const { data: assignmentMarks = [] } = useGetAssignmentMarkQuery(undefined, { refetchOnMountOrArgChange: true })
    const { id: userId } = useSelector(state => state.user.user)

    //Getting all users assignment marks & quize marks with name,id,totalmarks
    const getQuizeAndAssignmentMarks = () => {

        let results = allStudents.map(student => {
            let allQuizeMarks = quizeMarks.filter(quize => quize.student_id == student.id).map(quize => quize.mark).reduce((prev, current) => prev + current, 0)
            let allAssignmentMarks = assignmentMarks.filter(assignment => assignment.student_id == student.id).map(assignment => assignment.mark).reduce((prev, current) => prev + current, 0)
            return { id: student.id, name: student.name, totalQuizeMark: allQuizeMarks, assignmentMark: allAssignmentMarks, totalMark: allQuizeMarks + allAssignmentMarks }
        })
        return results



    }

    //Grouping rank by total marks suppose two users has same  total number then they will remain in same group
    const rankbyMarks = () => {

        return getQuizeAndAssignmentMarks()?.reduce((prev, current) => {
            if (prev[current.totalMark]) {
                prev[current.totalMark].push(current)
            } else {
                prev[current.totalMark] = []
                prev[current.totalMark].push(current)
            }
            return prev
        }, {})


    }

    //sorting rank by total marks
    const sortResults = (data) => {
        return Object.entries(data)?.sort((a, b) => parseInt(b[0]) - parseInt(a[0]))

    }
    //getting current user rank from the rank list
    const getCurrentUserRank = () => {

        if (allStudents.length > 0 && quizeMarks.length > 0 && assignmentMarks.length > 0 && userId) {
            let results = sortResults(rankbyMarks())
            let index = results.findIndex(item => item[1].find(user => user.id == userId))

            const { name, totalQuizeMark, totalMark, assignmentMark } = results[index][1].find(user => user.id == userId)
            return <tr>
                <td className="table-th !text-center">{index + 1}</td>
                <td className="table-th !text-center">{name}</td>
                <td className="table-th !text-center">{totalQuizeMark}</td>
                <td className="table-th !text-center">{assignmentMark}</td>
                <td className="table-th !text-center">{totalMark}</td>
            </tr >
        }

    }

    //showing top 20 rank
    const showTopTwentyResult = () => {
        if (allStudents.length > 0 && quizeMarks.length > 0 && assignmentMarks.length > 0) {
            let ranks = sortResults(rankbyMarks())

            return ranks.slice(0, 20).map((item, index) => {
                let info = item[1]
                if (info.length == 1) {
                    return <tr className="border-2 border-cyan">
                        <td className="table-td text-center font-bold">{index + 1}</td>
                        <td className="table-td text-center font-bold">{info[0].name}</td>
                        <td className="table-td text-center font-bold">{info[0].totalQuizeMark}</td>
                        <td className="table-td text-center font-bold">{info[0].assignmentMark}</td>
                        <td className="table-td text-center font-bold">{info[0].totalMark}</td>
                    </tr>
                } else {
                    return info.map((item) => {
                        return <tr className="border-2 border-cyan">
                            <td className="table-td text-center font-bold">{index + 1}</td>
                            <td className="table-td text-center font-bold">{item.name}</td>
                            <td className="table-td text-center font-bold">{item.totalQuizeMark}</td>
                            <td className="table-td text-center font-bold">{item.assignmentMark}</td>
                            <td className="table-td text-center font-bold">{item.totalMark}</td>
                        </tr>
                    })
                }

            })
        }
    }
    return <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div>
                <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr className="border-b border-slate-600/50">
                            <th className="table-th !text-center">Rank</th>
                            <th className="table-th !text-center">Name</th>
                            <th className="table-th !text-center">Quiz Mark</th>
                            <th className="table-th !text-center">Assignment Mark</th>
                            <th className="table-th !text-center">Total</th>
                        </tr>

                    </thead>

                    <tbody>

                        {getCurrentUserRank()}


                    </tbody>
                </table>
            </div>

            <div className="my-8">
                <h3 className="text-lg font-bold">Top 20 Result</h3>
                <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr className="border-b border-slate-600/50">
                            <th className="table-th !text-center">Rank</th>
                            <th className="table-th !text-center">Name</th>
                            <th className="table-th !text-center">Quiz Mark</th>
                            <th className="table-th !text-center">Assignment Mark</th>
                            <th className="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    <tbody>

                        {showTopTwentyResult()}

                    </tbody>
                </table>
            </div>
        </div>
    </section>
}
