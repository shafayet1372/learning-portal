import React, { useEffect, useState } from 'react'
import Logo from '../../assets/image/learningportal.svg'
import { useUserRegisterMutation } from '../../features/api/userApi'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Registration() {
    const [userRegister, { data, isLoading, isSuccess, isError, error }] = useUserRegisterMutation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        //if the user is successfully registered then redirect to the course-videos page with success message
        if (isSuccess) {
            Swal.fire({
                text: `Welcome ${data?.user?.name}`,
                icon: "success",
            });
            navigate('/course-videos')
        }
    }, [isSuccess])

    useEffect(() => {

        if (isError) {
            Swal.fire({
                text: error.data,
                icon: "error",
            })
            setPassword('')
            setConfirmPassword('')


        }
    }, [isError])
    const submitHandler = (e) => {
        e.preventDefault()

        //checking if the password and confirm password are same or not else submit the form
        if (password !== confirmPassword) {
            Swal.fire({
                text: 'Password and Confirm Password must be same',
                icon: "error",
            });
        } else {

            userRegister({ name, email, password, role: 'student' })
        }
    }

    return <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto max-w-md px-5 lg:px-0">
            <div>
                <img className="h-12 mx-auto" src={Logo} />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                    Create Your New Account
                </h2>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submitHandler}>
                <input type="hidden" name="remember" value='true' />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="name" className="sr-only">Name</label>
                        <input id="name" name="name" type="name" autocomplete="name" required
                            value={name} onChange={(e) => setName(e.target.value)}
                            className="login-input rounded-t-md" placeholder="Student Name" />
                    </div>
                    <div>
                        <label for="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="login-input " placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="login-input" placeholder="Password" />
                    </div>
                    <div>
                        <label for="confirm-password" className="sr-only">Confirm Password</label>
                        <input id="confirm-password" name="confirm-password" type="password"
                            autocomplete="confirm-password" required className="login-input rounded-b-md"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    </section>

}
