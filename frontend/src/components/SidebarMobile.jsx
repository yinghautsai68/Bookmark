import React from 'react'
import cookie from '../assets/cookie.png'
import { NavLink } from 'react-router-dom'

import iconHome from '../assets/icon-home.svg'
import iconSearch from '../assets/icon-search.svg'
import iconChatroom from '../assets/icon-chatroom.png'
import iconAccount from '../assets/icon-account.png'
import iconCreate from '../assets/icon-create.svg'
const SidebarMobile = ({ className }) => {
    return (
        <div className={`${className} lg:hidden w-full h-[10%] py-2 bg-black`}>
            <ul className='flex flex-row justify-center items-center gap-2 w-full h-full'>
                <NavLink to='/home'>
                    <img src={iconHome} className='w-10 h-10' alt="" />
                </NavLink>
                <NavLink to='/search'>
                    <img src={iconSearch} className='w-10 h-10' alt="" />
                </NavLink>
                <NavLink to='/create'>
                    <img src={iconCreate} className='w-10 h-10' alt="" />
                </NavLink>
                <NavLink to='/chatroom'>
                    <img src={iconChatroom} className='w-10 h-10' alt="" />
                </NavLink>
                <NavLink to='/profile'>
                    <img src={iconAccount} className='w-10 h-10' alt="" />
                </NavLink>

            </ul>
        </div>
    )
}

export default SidebarMobile