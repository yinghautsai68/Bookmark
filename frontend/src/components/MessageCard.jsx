import React from 'react'
import cookie from '../assets/cookie4.png'
const MessageCard = () => {
    return (
        <div className='flex flex-row gap-2 w-full cursor-pointer'>
            <img className='w-15 h-15 rounded-full' src={cookie} alt="" />
            <div>
                <p className='text-white'>mylovecookie_</p>
                <p className='text-white'>My pet cookie!</p>
            </div>
        </div>
    )
}

export default MessageCard