import React, { useEffect } from 'react'
import { useState } from 'react'
import Logo from '../../assets/image/learningportal.svg'
import { useUserLoginMutation } from '../../features/api/userApi'
import { useGetAssignmentMarkQuery } from '../../features/api/asssignmentApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/user/userSlice'
import Swal from 'sweetalert2'


export default function AdminLogin() {

    const [adminLogin, { data, isLoading, isError, isSuccess, error }] = useUserLoginMutation()
    const { data: assignmentMark } = useGetAssignmentMarkQuery()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [removeUser, setRemoveUser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {

        if (isSuccess && data?.user?.role === 'admin') {
            Swal.fire({

                title: `Welcome ${data?.user?.name}`,
                html: `<h1 style='color:red'>Assignment Marks Pending :${assignmentMark.filter(mark => mark.status == 'pending').length}</h1>`,
                icon: "success",
            });
            navigate('/admin/dashboard')
        }
        if (isSuccess && data?.user?.role === 'student') {

            setEmail('')
            setPassword('')
            setRemoveUser(true)
            Swal.fire({

                text: 'You are not authorized to access this page',
                icon: "error",
            });
        }
    }, [isSuccess])

    //remove the user from the local storage if the user is student & try to login from the admin login page
    useEffect(() => {
        if (removeUser) {
            localStorage.removeItem('user')
            setRemoveUser(false)
        }
    }, [removeUser])
    useEffect(() => {

        if (isError) {

            Swal.fire({

                text: error.data,
                icon: "error",
            });
        }
    }, [isError])
    const loginHandler = (e) => {
        e.preventDefault()
        adminLogin({ email, password })
    }

    return <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <img className="h-12 mx-auto" src={Logo} />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Sign in to Admin Account
                </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={loginHandler}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email"
                            autocomplete="email" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input rounded-t-md"
                            placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password"
                            autocomplete="current-password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            className="login-input rounded-b-md"
                            placeholder="Password" />
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-violet-600 hover:text-violet-500">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </section>
}
