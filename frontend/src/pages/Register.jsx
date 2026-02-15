import React, { useContext, useEffect, useRef, useState } from 'react'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Context } from '../context/Context'

import toast from 'react-hot-toast'

import cookie from '../assets/cookie.png'
const Register = ({ text }) => {
    const notify = (msg) => toast.error(msg)
    const { navigate } = useContext(Context)


    const [step, setStep] = useState(1)
    //step1
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    //step2
    const fileInputRef = useRef(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")


    const handleDivClick = () => {
        fileInputRef.current.click();
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        const isStep2Valid = checkFormStep2();
        if (!isStep2Valid) {
            return;
        }

        const formData = new FormData();
        formData.append("email", email)
        formData.append("password", password);
        formData.append("imageFile", fileInputRef.current.files[0]);
        formData.append("username", username);
        formData.append("bio", bio);


        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                method: "POST",
                body: formData,

                /*JSON */
                /*
                headers: {
                    "Content-Type": "application/json"
                },
                */
                /*
                body: JSON.stringify({ email, password, username, imageFile, bio })
                */

            });
            const data = await res.json();

            if (res.ok) {
                toast.success(data.message)
                navigate("/")

            }
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(username)
    }, [username])

    const nextStep = () => {
        const isValid = checkForm()
        if (isValid) {
            setStep(2)
        }
    }
    const checkForm = () => {
        if (email === "") {
            notify("請輸入電子郵件")
            return false
        }

        if (!email.includes("@")) {
            notify("非電子郵件")
            return false
        }

        if (password === "") {
            notify("請輸入密碼")
            return false
        }

        if (password.length < 8) {
            notify("密碼必須8字以上")
            return false
        }

        if (confirmPassword === "") {
            notify("請確認密碼")
            return false
        }

        if (password !== confirmPassword) {
            notify("密碼不一致")
            return false
        }
        return true
    }

    const checkFormStep2 = () => {
        if (!fileInputRef.current.files[0]) {
            notify("請上傳頭像");
            return false;
        }

        if (username.trim() === "") {
            notify("請輸入用戶名稱");
            return false;
        }

        return true;
    }
    return (
        <div className=' w-full h-full'>
            {/*Upper Main Div */}
            <div className='flex flex-row justify-center items-center w-full h-[80%] '>
                {/*Form Div */}
                <div className=' flex flex-col gap-5 w-[70%] md:w-[40%] lg:w-[30%] h-[60%]  '>
                    <Title text='BookMark'></Title>
                    <form action="" onSubmit={onSubmit} noValidate className='flex flex-col items-center gap-2 w-full h-full '>
                        {
                            step === 1 && (<div className=' xl:px-20 flex flex-col gap-2 w-full    '>
                                <Input type='email' text="電子郵件" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Input type='password' text="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <Input type='password' text="重新密碼" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                <Button onClick={() => nextStep()} type="button" text="下個步驟" className='rounded-xl bg-[#31244F]' />
                            </div>)
                        }
                        {step === 2 && (
                            /*2nd Part Div */
                            < div className='w-full h-full flex flex-col gap-2  '>
                                {/*2nd Part Div - form only*/}
                                <div className=' w-full h-[100%] flex flex-row items-center md:flex-row gap-3 '>
                                    {/*2nd Part Div - left side */}
                                    <div className='w-full h-full flex flex-col justify-center items-center gap-2  '>

                                        {/* Clickable Div */}
                                        <div onClick={handleDivClick} className=' flex flex-row justify-center items-center w-full  aspect-square border border-3  rounded-2xl border-dotted'>
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="preview"
                                                    className='w-full aspect-square rounded-2xl object-cover'
                                                />
                                            ) : (
                                                <span>Click to upload</span>
                                            )}
                                        </div>

                                        {/* Hidden Input */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            className='hidden '
                                            onChange={handleFileChange}
                                        />

                                        <Input text="用戶名稱" value={username} onChange={(e) => setUsername(e.target.value)} className={'w-full h-[20%]'} />
                                    </div>
                                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className='w-full h-full p-2 border rounded-xl' name="" id="" placeholder='描述你自己'></textarea>
                                </div>
                                <Button text="註冊" type="submit" className="rounded bg-[#31244F]" />
                            </div>
                        )}
                    </form>
                    <Link to="/">
                        <p className='text-center cursor-pointer'>有帳號? 登入</p>
                    </Link>
                </div>

            </div >
            <Footer />
        </div >
    )
}

export default Register