import React, { useContext, useEffect, useState } from 'react'
import cookie from '../assets/cookie4.png'

import iconHome from '../assets/icon-home.svg'
import iconSearch from '../assets/icon-search.svg'
import iconChatroom from '../assets/icon-chatroom.png'
import iconAccount from '../assets/icon-account.png'
import iconCreate from '../assets/icon-create.svg'
import * as Icon from 'react-feather';
import { NavLink, useNavigate } from 'react-router-dom'
import SidebarLinks from './SidebarLinks'

import toast from 'react-hot-toast'
import { Context } from '../context/Context'


const Sidebar = () => {
    const { navigate } = useContext(Context)
    const [username, setUsername] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const onLoad = async () => {
        const token = localStorage.getItem("token")

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        setUsername(data.username)
        setProfilePic(data.profilePic)

    }
    useEffect(() => {
        onLoad()
    }, [])

    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('token')
    }
    return (
        <div className='hidden lg:block fixed w-[20%] h-full pl-10 pr-5 py-10 border-r bg-black' style={{ borderColor: '#484141ff' }}>
            < div className='flex flex-row items-center  gap-2' >
                <img onClick={() => navigate('/profile')} className='w-15 aspect-square rounded-xl object-cover cursor-pointer' src={profilePic} alt="" />
                <div className='flex flex-col w-full '>
                    <div className='flex flex-row justify-between items-center w-full '>
                        <span>哈囉!</span>
                        <span onClick={() => handleLogout()} className='text-gray-500 cursor-pointer'>登出</span>
                    </div>
                    <span className=''>{username}</span>
                </div>
            </div >
            <ul className='w-full h-[85%] flex flex-col justify-center gap-5  '>
                <NavLink to='/home' className={({ isActive }) => isActive && 'bg-[#454343ff] rounded-xl'}>
                    {(isActive) =>
                        <SidebarLinks icon={iconHome} text="首頁" />
                    }
                </NavLink>
                <NavLink to='/search' className={({ isActive }) => isActive && 'bg-[#454343ff] rounded-xl'}>
                    {(isActive) =>
                        <SidebarLinks icon={iconSearch} text="搜尋" />
                    }
                </NavLink>

                <NavLink to='/chatroom' className={({ isActive }) => isActive && 'bg-[#454343ff] rounded-xl'}>
                    {(isActive) =>
                        <SidebarLinks icon={iconChatroom} text="聊天室" />
                    }
                </NavLink>
                <NavLink to='/profile' className={({ isActive }) => isActive && 'bg-[#454343ff] rounded-xl'}>
                    {(isActive) =>
                        <SidebarLinks icon={iconAccount} text="個人檔案" />
                    }
                </NavLink>
                <NavLink to='/create' className={({ isActive }) => isActive && 'bg-[#454343ff] rounded-xl'}>
                    {(isActive) =>
                        <SidebarLinks icon={iconCreate} text="建立" />
                    }
                </NavLink>
            </ul >
            <div className='flex flex-row items-center gap-2 cursor-pointer'>
                <SidebarLinks text="設定" />
            </div>
        </div >
    )
}

export default Sidebar