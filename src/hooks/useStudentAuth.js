
import { useEffect, useState } from 'react'
export const useStudentAuth = () => {
    const [role, setRole] = useState(() => {
        return JSON.parse(window.localStorage?.getItem('user'))?.role

    })



    return role == 'student'
}


