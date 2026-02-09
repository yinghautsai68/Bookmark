import React, { useState } from 'react'

const CardSettings = ({ setSettingsPostID, settingsPostID, setPosts }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${settingsPostID}/delete`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()

            console.log(data.deletePost)

            if (data.deletePost) {
                setPosts(prev => prev.filter(post => post._id !== settingsPostID))

                setSettingsPostID("")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const [newCaption, setNewCaption] = useState("")
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${settingsPostID}/update`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    caption: newCaption
                })
            })
            const data = await response.json()
            console.log(data)

            //change when reopen
            setPosts(prev =>
                prev.map(post =>
                    post._id === settingsPostID ? { ...post, caption: newCaption } : post
                )
            )
            setEdit(false)
            setSettingsPostID("")

        } catch (error) {
            console.log(error.message)
        }

    }

    const [edit, setEdit] = useState(false)
    return (
        <div className='fixed left-0 top-0 w-full h-screen flex flex-row justify-center items-center bg-black/50 z-50'>
            {
                edit &&
                <div onClick={() => setEdit(false)} className='fixed w-full h-screen flex flex-row justify-center items-center '>
                    <div onClick={(e) => { e.stopPropagation() }} className='fixed w-[30%] h-[30%] flex flex-col justify-center items-center gap-2 bg-gray-900'>
                        <span className='text-3xl'>編輯</span>
                        <form onSubmit={handleUpdate} className='flex flex-row gap-2'>
                            <input onChange={(e) => setNewCaption(e.target.value)} className='pl-2 border rounded-md' type="text" />
                            <button className='p-2 border rounded-md cursor-pointer'>Submit</button>
                        </form>
                    </div>
                </div>
            }
            <ul className='p-5 flex flex-col gap-2 bg-black rounded-lg'>
                <li onClick={() => handleDelete()} className='text-red-500 cursor-pointer'>刪除</li>
                <li onClick={() => setEdit(true)} className='cursor-pointer'>編輯</li>
                <li onClick={() => setSettingsPostID("")} className='cursor-pointer'>取消</li>
            </ul>
        </div>
    )
}


export default CardSettings