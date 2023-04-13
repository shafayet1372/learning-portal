import React, { useEffect } from 'react'
import StudentNavbar from './StudentNavbar'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useStudentAuth } from '../../hooks/useStudentAuth'
export default function StudentRoute({ children }) {
    const auth = useAuth()
    const studentAuth = useStudentAuth()
    const location = useLocation()
    const navigate = useNavigate()


    /*if access token is manually removed from localstorage by user or someone then if user try to navigate student protected routes then he will be redirected to student login page*/
    useEffect(() => {
        let accessToken = JSON.parse(window.localStorage.getItem('user'))?.accessToken
        if (!accessToken) {
            navigate('/')

        }
    }, [location])

    //if user is authenticate and he is student then he will be able to access student protected routes. Admin cant access student protected routes
    if (auth && studentAuth) {
        return <div> <StudentNavbar />{children}</div>
    }


    return <Navigate to="/" />





}
