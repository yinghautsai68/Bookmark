import React, { useState, useRef, useEffectEvent, useEffect, useContext } from 'react'
import cookie from '../assets/cookie4.png'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

import IconCancel from '../assets/icon-cancel.svg'
const Create = () => {
    const { navigate } = useContext(Context)
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [mode, setMode] = useState("post")

    //OnLoad
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()

            console.log(data)
            setProfilePic(data.profilePic)
            setUsername(data.username)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])


    const ref = useRef(null)
    const handleClick = () => {
        ref.current.click()
    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImagePreview(URL.createObjectURL(file))
        setImage(ref.current.files[0])
    }



    const notify = (msg) => toast.success(msg)
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(image, caption)

        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("image", image)
            formData.append("caption", caption)
            if (mode === "post") {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/create`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                console.log(data)
                if (response.status === 200) {
                    notify("Post uploaded successfully")

                    navigate('/home')
                }
            } else if (mode === "story") {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/story/create`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json()

                console.log(data)
                if (response.status === 200) {
                    notify("Story uploaded successfully")

                    navigate('/home')
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <div className='w-full h-[90%] lg:h-full p-5 lg:p-10 flex flex-col md:flex-row justify-center gap-5'>
            <div className='w-full md:w-[50%]  h-[50%] md:h-full  flex flex-col gap-2 object-cover'>
                <div onClick={handleClick} className='w-full h-full flex flex-row bg-[#202020] cursor-pointer'>
                    {
                        imagePreview && (
                            <img src={imagePreview} className='w-full h-full object-contain' alt="" />
                        )
                    }
                </div>
                <input type="file" ref={ref} onChange={(e) => handleImage(e)} className='hidden' />
            </div>

            <form onSubmit={onSubmit} className='w-full  md:w-[35%] h-[50%] md:h-full md:p-5 flex flex-col justify-between gap-5 md:border border-[#5f5f5f] rounded-2xl'>
                <div className='w-full md:h-[60%] flex flex-row md:flex-col justify-between  items-center gap-5   '>
                    <div className=' flex flex-row justify-start items-center gap-5    md:w-full md:h-full  '>
                        <img className='w-15 h-15 rounded-2xl object-cover  cursor-pointer  ' src={profilePic} alt="" />
                        <h1 className='text-md '>{username}</h1>
                    </div>
                    <div className='flex flex-row justify-end gap-2 md:w-full     '>
                        <Button onClick={() => setMode("post")} type='button' text="貼文" className={`${mode === 'post' ? 'bg-[#31244F]' : ''} w-full rounded text-xs `}></Button>
                        <Button onClick={() => setMode("story")} type='button' text="限時" className={`${mode === 'story' ? 'bg-[#31244F]' : ''} w-full rounded text-xs `}></Button>
                    </div>
                    <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="hidden w-full  border rounded-2xl p-2 resize-none text-gray-500" placeholder="今天天氣真好..."></textarea>

                </div>
                <textarea value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full h-full  border border-[#5f5f5f] rounded-2xl p-2 resize-none text-gray-500" placeholder="今天天氣真好..."></textarea>
                <Button className="w-full md:h-[5%] md:py-5 rounded-lg hover:bg-[#31244F] transition-all" text="分享" />
            </form>


        </div >
    )
}

export default Create