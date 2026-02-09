import React from 'react'
import cookie from '../assets/cookie4.png'
const ConversationContainer = () => {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-row items-center gap-2 p-5'>
                <img className='w-15 h-15 rounded-full' src={cookie} alt="" />
                <h1>mylovecookie_</h1>
            </div>
            {/*Conversation */}
            <div className='flex flex-col gap-2 h-[100%] p-5 border'>
                <span className='text-center'>Monday</span>
                <div className='flex flex-row items-end gap-2'>
                    <p className='w-fit p-2 rounded-xl bg-red-500 text-white text-xl'>same lol</p><span className='text-md'>8:00 pm</span>
                </div>
                <div className='flex flex-row items-end gap-2'>
                    <p className='w-fit p-2 rounded-xl bg-red-500 text-white text-xl'>same lol</p><span className='text-md'>8:00 pm</span>
                </div>
                <div className='flex flex-row items-end gap-2'>
                    <p className='w-fit p-2 rounded-xl bg-red-500 text-white text-xl'>same lol</p><span className='text-md'>8:00 pm</span>
                </div>
                <div className='flex flex-row items-end gap-2'>
                    <p className='w-fit p-2 rounded-xl bg-red-500 text-white text-xl'>same lol</p><span className='text-md'>8:00 pm</span>
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <input className='w-[75%] px-2 border text-xl' type="text" />
                <img className='w-25 h-25 rounded-full cursor-pointer' src={cookie} alt="" />
            </div>
        </div>
    )
}

export default ConversationContainer