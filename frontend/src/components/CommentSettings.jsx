import React, { useState, useEffect } from 'react'

const CommentSettings = ({ settingsCommentID, setSettingsCommentID, setComments }) => {
    const [userID, setUserID] = useState("")
    const [commentUserID, setCommentUserID] = useState("")
    const getMe = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            setUserID(data.id)
        } catch (error) {
            console.log(error.message)
        }
    }
    const getCommentInfo = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/comment/${settingsCommentID}/get`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            setCommentUserID(data.comment.userID)
            console.log(data.comment)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getMe()
        getCommentInfo()
    }, [])



    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${settingsCommentID}/delete`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()

            console.log(data.deleteComment)

            if (data.deleteComment) {
                setComments(prev => prev.filter(comment => comment._id !== settingsCommentID))

                setSettingsCommentID("")
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const [newComment, setNewComment] = useState("")
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/comment/${settingsCommentID}/update`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: newComment
                })
            })
            const data = await response.json()
            console.log(data)
            //change upon edit
            setComments(prev => prev.map(comment => comment._id === settingsCommentID ? { ...comment, text: data.comment.text } : comment))
            setSettingsCommentID("")

        } catch (error) {
            console.log(error.message)
        }

    }
    const [edit, setEdit] = useState(false)
    return (
        <div className='fixed left-0 top-0 w-full h-screen flex flex-row justify-center items-center bg-black/50 z-50'>
            <span>Comment</span>
            <ul className='p-5 bg-black rounded-lg'>
                <li onClick={() => handleDelete()} className='text-red-500 cursor-pointer'>刪除</li>
                {
                    userID === commentUserID &&
                    <li onClick={() => setEdit(true)} className='cursor-pointer'>編輯</li>


                }
                <li onClick={() => setSettingsCommentID("")} className='cursor-pointer'>取消</li>

            </ul>
            {
                edit &&
                <div onClick={() => setEdit(false)} className='fixed w-full h-screen flex flex-row justify-center items-center '>
                    <div onClick={(e) => { e.stopPropagation() }} className='fixed w-[30%] h-[30%] flex flex-col justify-center items-center gap-2 bg-black'>
                        <span className='text-3xl'>編輯</span>
                        <form onSubmit={handleUpdate} className='flex flex-row gap-2'>
                            <input onChange={(e) => setNewComment(e.target.value)} className='pl-2 border rounded-md' type="text" />
                            <button className='p-2 border rounded-md cursor-pointer'>Submit</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}


export default CommentSettings