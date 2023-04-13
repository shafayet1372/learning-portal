import React, { useEffect, useState } from 'react'
import { setUser } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
export const useAuth = () => {

    const { accessToken } = useSelector(state => state.user.user)
    const [isAuthenticate, setIsAuthenticate] = useState(() => {
        let user = JSON.parse(window.localStorage.getItem('user'))
        return user?.accessToken ? true : false

    })

    const dispatch = useDispatch()

    useEffect(() => {
        /*when user will refresh the page  & state doesnt have any access token  then user will be logged in automatically by checking
        if there is any access token in localstorage or not
        */

        if (!accessToken) {
            let user = JSON.parse(window.localStorage.getItem('user'))
            if (user?.accessToken) {
                const { accessToken, role, email, password, name, id } = user
                dispatch(setUser({ accessToken, role, email, password, name, id }))
            }


        }
    }, [accessToken])
    return isAuthenticate
}