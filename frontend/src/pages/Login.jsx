import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import BookmarkLogo from '../assets/icon-bookmarklogo.png'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Input from '../components/Input'



import toast, { Toaster } from 'react-hot-toast'

const notify = (msg) => toast.error(msg)


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem("token", data.token)
                navigate("/home")
            } else {
                notify(data.message)


            }
        } catch (error) {

        }
    }


    useEffect(() => {
        console.log(email, password)
    }, [email, password])
    return (
        <div className='w-full h-screen'>
            <div className=' h-[80%] flex flex-row justify-between'>
                <div className='relative hidden w-full  h-full md:pr-15 md:flex justify-end items-center'>
                    <img className='w-[60%] object-cover z-10' src={BookmarkLogo} alt="" />
                    {/*Design*/}

                </div>

                <div className='w-full h-full md:pl-15 pt-15 flex flex-row justify-center items-center md:justify-start '>
                    <div className='w-[70%] lg:w-[45%] flex flex-col justify-center items-center gap-5  '>
                        <h1 className='text-4xl text-center font-imprima'>BookMark</h1>
                        <div className='w-full flex flex-col gap-5'>
                            <form action="" onSubmit={onSubmit}>
                                <div className='w-full flex flex-col gap-3 '>

                                    <Input value={email} onChange={(e) => setEmail(e.target.value)} text="帳號" />
                                    <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} text="密碼" />
                                    <Button className='w-full bg-[#31244F]' text="登入" type="submit" />
                                </div>
                            </form>

                            <Link to='/register'>
                                <p className='text-center '>沒有帳號? 建立帳號</p>
                            </Link>
                            <p className='text-center cursor-pointer'>忘記密碼?</p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />

        </div >
    )
}

export default Login