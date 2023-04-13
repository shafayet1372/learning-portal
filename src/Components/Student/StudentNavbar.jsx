import React, { useEffect, useState } from 'react'
import Logo from '../../assets/image/learningportal.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function StudentNavbar() {
    const { accessToken, name } = useSelector(state => state.user.user)
    const [loggedOut, setLoggedOut] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (loggedOut) {
            window.localStorage.removeItem('user')
            dispatch(setUser({ email: '', password: '', accessToken: '', role: '', name: '' }))
        }

    }, [loggedOut])

    useEffect(() => {

        if (loggedOut) {
            Swal.fire({
                text: 'You have been logged out',
            })
            navigate('/')
        }
    }, [loggedOut])
    const logoutHandler = (e) => {
        setLoggedOut(true)
    }

    return <nav className="shadow-md">
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
            <Link to='/course-videos'><img className="h-10" src={Logo} /></Link>
            <div className="flex items-center gap-3">
                <Link to={`/leaderboard`}>Leaderboard</Link>
                <h2 className="font-bold">{name}</h2>
                <button
                    onClick={logoutHandler}
                    className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    </nav>
}
