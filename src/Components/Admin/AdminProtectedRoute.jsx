import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAdminAuth } from '../../hooks/useAdminAuth'
export default function AdminRoute({ children }) {
    const auth = useAuth()
    const adminAuth = useAdminAuth()
    const location = useLocation()
    const navigate = useNavigate()


    /*if access token is manually removed from localstorage by user or someone then if user try to navigate admin protected routes then he will be redirected to admin login page*/
    useEffect(() => {
        let accessToken = JSON.parse(window.localStorage.getItem('user'))?.accessToken
        if (!accessToken) {
            navigate('/admin')

        }
    }, [location])

    //if user is authenticate and he is admin then he will be able to access admin protected routes only.Student cant access admin protected routes
    if (auth && adminAuth) {
        return <div> <AdminNavbar />{children}</div>
    }


    return <Navigate to="/admin" />





}
