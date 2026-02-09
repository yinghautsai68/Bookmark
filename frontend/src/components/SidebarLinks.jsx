import React from 'react'

const SidebarLinks = ({ icon, text }) => {
    return (
        <li className='p-1 flex flex-row items-center gap-2 text-lg xl:text-2xl  cursor-pointer' >
            {
                icon && (
                    <img className='w-[50px] h-[50px]' src={icon} alt="" />
                )
            }

            <span>{text}</span>
        </li>
    )
}

export default SidebarLinks