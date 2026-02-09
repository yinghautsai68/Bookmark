import React from 'react'
import cookie from '../assets/cookie4.png'
const MessageButton = () => {
    return (
        <div className='fixed right-20 bottom-15 hidden md:flex flex-row justify-start items-center gap-2  w-75 h-15 px-5    rounded-3xl bg-white cursor-pointer' style={{ backgroundColor: '#171923ff' }}>
            <h1 className='text-lg'>訊息</h1>
        </div>
    )
}

export default MessageButton