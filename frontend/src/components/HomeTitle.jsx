import React from 'react'
import IconBell from '../assets/icon-bell.png'
import IconSettings from '../assets/icon-settings.png'

const HomeTitle = () => {
    return (
        <div className='lg:hidden flex flex-row justify-center items-center w-full px-2 '>
            <div className='w-[25%] h-full '></div>
            <div className='w-[50%] text-center text-xl text-white'>Bookmark</div>
            <div className='flex flex-row justify-center gap-2 w-[25%] '>
                <img src={IconBell} className='w-8 h-8' alt="" />
                <img src={IconSettings} className='w-8 h-8' alt="" />
            </div>
        </div>
    )
}

export default HomeTitle