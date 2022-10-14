import axios from 'axios';
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import setAuthToken from '../../utilitis/setAuthtoken';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleName = (e) => {
        const userName = e.target.value.toLowerCase();
        setName(userName)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('https://user-dashboard-server.herokuapp.com/vouche/users/registration', { name, password })
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                    if (res.data.error.password && res.data.error.name) {
                        setNameError(res.data.error.name)
                        setPasswordError(res.data.error.password)
                    }

                    if (res.data.error.password) {
                        setPasswordError(res.data.error.password)
                    }

                    if (res.data.error.name) {
                        setNameError(res.data.error.name)
                    }

                }
                if (res.data.token) {
                    const decoded = jwt_decode(res.data.token);
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    setAuthToken(res.data.token)
                    setUser(decoded)
                    setPasswordError('')
                    setNameError('')
                    setPassword('')
                    setName('')
                    e.target.reset()
                }

                if (res.data.message === "Name Already Exist") {
                    const token = localStorage.getItem("token")
                    const decoded = jwt_decode(token);

                    if (decoded.name === name) {
                        axios.post('https://user-dashboard-server.herokuapp.com/vouche/users/login', { name, password })
                            .then(res => {

                                console.log(res)

                                if (res.data.message === "Password Didn't Match" || !password) {
                                    setPasswordError(res.data.message)
                                }

                                if (res.data.user) {
                                    const token = JSON.parse(localStorage.getItem('token'))
                                    setAuthToken(token)
                                    setNameError("")
                                    setPasswordError("")
                                    setPassword('')
                                    setName("")
                                    setUser(user)
                                    e.target.reset()
                                }
                            })


                    }

                }

            })
    }

    return (
        <div className='md:flex items-center'>

            <form onSubmit={handleLogin} className='md:w-6/12 md:flex items-center justify-center flex-col ml-8 mt-36'>

                <h2 className='font-bold text-2xl text-center'>Welcome</h2>
                <p className='text-gray-400 text-center'>Enter your Username and Password</p>
                <div className='mt-8 text-center'>
                    <input type="text" placeholder="Username" className="input md:min-w-[450px] input-bordered input-gray-100 w-full max-w-xs focus:outline-none" onBlur={handleName} />
                    <p className='text-red-500 text-center'>{nameError && nameError}</p>
                </div>

                <div className='mt-3 text-center'>
                    <input type="password" placeholder="Password" className="input md:min-w-[450px]  input-bordered input-gray-100 w-full max-w-xs focus:outline-none" onBlur={handlePassword} />
                    <p className='text-red-500 text-center'>{passwordError && passwordError}</p>
                </div>

                <div className='text-center'>
                    <button className="btn btn-primary md:inline-block w-full mt-3 max-w-xs md:min-w-[450px]">Submit</button>
                    <p className='text-center text-gray-500 mt-2'>Forgot Password ?</p>
                </div>
            </form>

            <div className='w-6/12 hidden  bg-primary min-h-screen md:flex items-center justify-center flex-col relative'>
                <h2 className='text-4xl font-bold font-serif text-white'>Welcome to Address Book Application</h2>
            </div>
        </div>
    );
};

export default Login;