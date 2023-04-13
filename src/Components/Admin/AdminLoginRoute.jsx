import React from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
export default function AdminRoute({ children }) {
    const auth = useAuth()
    const adminAuth = useAdminAuth()

    /*Checking if the admin is already authenticated .If he is then if he try to access admin login page by browser url he'll redirect to dashboard page .Otherwise he will redirect to admin page.

    */
    if (auth && adminAuth) {
        return <Navigate to='/admin/dashboard' />
    }
    return children
}
