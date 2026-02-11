import React, { useState, useEffect, useRef } from 'react'
import cookie from '../assets/cookie.png'
import * as Icon from 'react-feather'


import io from 'socket.io-client'

import CardSettings from './CardSettings'
import CommentSettings from './CommentSettings'

import IconHeartOutline from '../assets/icon-heart-outline.png'
import IconHeartRed from '../assets/icon-heart-red.png'
import IconCommentOutline from '../assets/icon-comment-outline.png'
import IconBookmarkOutline from '../assets/icon-bookmark-outline.png'
import IconBookmarkPurple from '../assets/icon-bookmark-purple.png'
import IconSend from '../assets/icon-send.png'
import IconDots from '../assets/icon-dots.png'
import IconArrowLeft from '../assets/icon-arrow-left-5f5f5f.png'
import SidebarMobile from './SidebarMobile'


const Socket = io(`${import.meta.env.VITE_BACKEND_URL}`)
const PostDetail = ({ setPosts, post, setSelectedPost }) => {


    useEffect(() => {
        console.log("postdata:", post)
    }, [])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const [poster, setPoster] = useState("")
    const [caption, setCaption] = useState(post.caption)
    const onLoad = async () => {
        try {
            //Get Token
            const token = localStorage.getItem("token")

            //Load Comments
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${post._id}/get`)
            const data = await response.json()
            console.log(data)
            setComments(data.comments)

            //Like Status

            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${post._id}/likestatus`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()
            console.log("data2", data2)
            setLiked(!!data2.likeStatus)

            //Bookmark Status
            const response3 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/postbookmark/${post._id}/bookmarked`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data3 = await response3.json()
            console.log(data3)
            setIsBookmarked(!!data3.bookmarked)

            //Poster Info
            const response4 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${post.userID}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data4 = await response4.json()
            console.log("poster data:", data4)
            setPoster(data4)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])

    const newCommentRef = useRef(null)

    /*
    useEffect(() => {
        newCommentRef.current.scrollIntoView({ behavior: "smooth" })
    }, [comments])
    */

    //PUT likes count
    const [liked, setLiked] = useState(null)
    const handleLike = async (req, res) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${post._id}/like`, {
                method: 'PUT',
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data)
            setLiked(data.liked)
        } catch (error) {
            console.log(error.message)
        }
    }


    const commentPost = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()

            Socket.emit("postComment", {
                postID: post._id,
                userID: data.id,
                text: comment
            })


            //notification
            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/post/${post._id}/comment`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()
            console.log(data2.notification)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (post._id) {
            Socket.emit("joinPost", post._id)
        }
    }, [post._id])
    useEffect(() => {
        Socket.on("newComment", (newComment) => {
            setComments(prev => [newComment, ...prev])
        })
    }, [])

    const [isBookmarked, setIsBookmarked] = useState(false)
    const handleBookmark = async () => {

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/postbookmark/${post._id}/bookmark`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            setIsBookmarked(data.bookmarked)
        } catch (error) {
            console.log(error.message)
        }
    }


    const [settingsPostID, setSettingsPostID] = useState("")
    const [settingsCommentID, setSettingsCommentID] = useState("")


    const [openComment, SetOpenComment] = useState(false)
    const handleCommentToggle = (boolean) => {
        SetOpenComment(boolean)
    }
    return (
        <div onClick={() => setSelectedPost(null)} className=' fixed top-0 left-0 w-full h-[90%] md:p-3 flex flex-row justify-center items-center bg-black/70 z-20'>
            <div onClick={(e) => e.stopPropagation()} className=' w-full md:w-[80%] lg:w-[60%] h-full md:h-[80%] p-2 flex flex-col md:flex-row justify-start items-center bg-black md:bg-[#202020]   '>
                {/*Left Side */}
                <div className={`${openComment ? 'w-[40%] h-[30%]' : 'w-full h-full'} relative flex-col  md:w-[50%]  md:h-full transition-all duration-300 `}>
                    <img onClick={() => setSelectedPost(null)} src={IconArrowLeft} className='fixed md:hidden left-2 top-2 w-10 h-10' alt="" />
                    <img onClick={() => handleCommentToggle(false)} className='w-full h-[90%] md:h-full  object-contain ' src={post.image_URL} alt="" />
                    <div className={`${openComment ? 'hidden' : 'flex'} md:hidden  flex-row justify-between items-center gap-3 w-[80%] h-[10%] px-3 rounded-2xl bg-[#0F0F0F]`}>
                        <div className='w-full flex flex-row  items-center gap-5'>
                            <img className='w-15 h-15 rounded-xl object-cover' src={poster.profilePic} alt="" />
                            <div className='flex flex-col'>
                                <span>{poster.username}</span>
                                <span>{caption}</span>
                            </div>
                        </div>
                        <img onClick={() => setSettingsPostID(post._id)} className='w-5 h-5 rounded-xl object-cover cursor-pointer' src={IconDots} alt="" />
                    </div>
                    <div className={`${openComment ? 'hidden' : 'absolute'} md:hidden  right-0 bottom-0 flex flex-col `}>
                        <img src={liked ? IconHeartRed : IconHeartOutline} onClick={handleLike} className={`${liked ? 'text-red-100' : 'text-gray-500'}  w-10 h-10 cursor-pointer`} />
                        <img src={IconCommentOutline} onClick={() => handleCommentToggle(true)} className='w-10 h-10 cursor-pointer' />
                        <img src={isBookmarked ? IconBookmarkPurple : IconBookmarkOutline} onClick={handleBookmark} className='w-10 h-10 cursor-pointer' />
                    </div>
                </div>

                {/*Right Side */}
                <div className={`${openComment ? 'block' : 'hidden'} md:block  w-full md:w-[50%]  h-[70%] md:h-full p-2 flex  flex-col gap-2  bg-black `}>
                    <div className='flex-1 flex flex-col gap-2 h-[85%] overflow-y-auto'>
                        <div className='p-3 flex flex-row justify-between items-center gap-3 bg-[#0F0F0F]'>
                            <div className='w-full flex flex-row  items-center gap-5'>
                                <img className='w-15 h-15 rounded-xl object-cover' src={poster.profilePic} alt="" />
                                <div className='flex flex-col'>
                                    <span>{poster.username}</span>
                                    <span>{caption}</span>
                                </div>
                            </div>
                            <img onClick={() => setSettingsPostID(post._id)} className='w-5 h-5 rounded-xl object-cover cursor-pointer' src={IconDots} alt="" />
                        </div>
                        {comments.map((item) => {
                            return (
                                <div key={item._id} className='p-3 flex flex-row justify-between items-center gap-3 bg-[#0F0F0F]'>
                                    <div className='flex flex-row items-center gap-5'>
                                        <img className='w-15 h-15 rounded-xl object-cover' src={item.userID.imageFile} alt="" />
                                        <div className='flex flex-col'>
                                            <span>{item.userID.username}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    </div>

                                    <img onClick={() => setSettingsCommentID(item._id)} className='w-5 h-5 rounded-xl object-cover cursor-pointer' src={IconDots} alt="" />


                                </div>
                            )
                        })}
                        <div ref={newCommentRef}></div>
                    </div>

                    <form onSubmit={commentPost} className='px-3 py-3 h-[15%] flex flex-row  items-center gap-2 bg-[#0F0F0F]'>
                        <img src={liked ? IconHeartRed : IconHeartOutline} onClick={handleLike} className={`${liked ? 'text-red-100' : 'text-gray-500'}  w-8 aspect-square cursor-pointer`} />
                        <textarea type="text" placeholder='留言' value={comment} onChange={(e) => setComment(e.target.value)} className='flex-1 pl-2 border resize-none' />

                        <button type='submit' className='w-8 aspect-square'><img src={IconSend} className='w-full h-full ' alt="" /></button>
                        <img src={isBookmarked ? IconBookmarkPurple : IconBookmarkOutline} onClick={handleBookmark} className='w-8 aspect-square cursor-pointer ' />
                    </form>
                </div>

            </div>


            {
                settingsPostID &&
                <CardSettings setPosts={setPosts} settingsPostID={settingsPostID} setSettingsPostID={setSettingsPostID} setCaption={setCaption} />
            }

            {
                settingsCommentID &&
                <CommentSettings settingsCommentID={settingsCommentID} setSettingsCommentID={setSettingsCommentID} setComments={setComments} />
            }

        </div >
    )
}

export default PostDetail