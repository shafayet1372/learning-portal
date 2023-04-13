
import { useEffect, useState } from 'react'
export const useAdminAuth = () => {
    const [role, setRole] = useState(() => {
        return JSON.parse(window.localStorage?.getItem('user'))?.role

    })



    return role == 'admin'
}


