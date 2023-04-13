import React from 'react'
import { useStudentAuth } from '../../hooks/useStudentAuth'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
export default function StudentRoute({ children }) {
    const auth = useAuth()
    const studentAuth = useStudentAuth()

    /*Checking if the student is already authenticated .If he is then if he try to access  login page  or register by browser url he'll redirect to course player  page .Otherwise he will redirect to login page.

    */
    if (auth && studentAuth) {
        return <Navigate to='/course-videos' />
    }
    return children
}
