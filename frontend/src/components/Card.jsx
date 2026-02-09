import React, { useEffect, useState } from 'react'

import IconHeartOutline from '../assets/icon-heart-outline.png'
import IconHeartRed from '../assets/icon-heart-red.png'
import IconCommentOutline from '../assets/icon-comment-outline.png'
import IconBookmarkOutline from '../assets/icon-bookmark-outline.png'
import IconBookmarkPurple from '../assets/icon-bookmark-purple.png'
import dots from '../assets/icon-dots.png'

import { NavLink } from 'react-router-dom'
const Card = ({ post, onClick, setSettingsPostID, className }) => {
    //OnLoad
    const [userID, setUserID] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const getUserInfo = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${post.userID}/userinfo`)
        const data = await response.json()
        //console.log(data)
        setUserID(post.userID)
        setProfilePic(data.profilePic)
        setUsername(data.username)
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    const timeAgo = (dateString) => {
        const now = new Date()
        const past = new Date(dateString)

        const diffMs = now - past
        const diffMinutes = Math.floor(diffMs / 1000 / 60)
        const diffHours = Math.floor(diffMinutes / 60)
        const diffDays = Math.floor(diffHours / 24)

        if (diffMinutes < 60) {
            return `${diffMinutes} 分鐘前`
        }

        if (diffHours < 24) {
            return `${diffHours} 小時前`
        }

        return `${diffDays} 天前`
    }

    //GET likes count
    const [likesCount, setLikesCount] = useState("")
    const getLikesCount = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${post._id}/getlikecount`, {
                method: "GET"
            })
            const data = await response.json()

            //console.log(data)
            setLikesCount(data.likesCount)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getLikesCount()
    }, {})

    //PUT Likes
    const [liked, setLiked] = useState("")
    const handleLike = async () => {
        try {
            let token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${post._id}/like`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            console.log(data)
            setLiked(data.liked)
            setLikesCount(data.likesCount)

            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/post/${post._id}/like`, {
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

    //GET comments count
    const [commentsCount, setCommentsCount] = useState("")
    const getCommentsCount = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${post._id}/getcommentscount`)
            const data = await response.json()

            //console.log(data)
            setCommentsCount(data.commentsCount)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getCommentsCount()
    }, [])

    const [bookmarked, setBookmarked] = useState(null)
    const bookmarkStatus = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/postbookmark/${post._id}/bookmarked`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            //console.log("bookmarked:" + !!data.bookmarked)
            setBookmarked(!!data.bookmarked)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        bookmarkStatus()
    }, [])
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
            setBookmarked(data.bookmarked)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getLikeStatus = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${post._id}/likestatus`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log("likestatus:", data.likeStatus)
            setLiked(data.likeStatus)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getLikeStatus()
    }, [])


    const handleSettings = (post) => {
        setSettingsPostID(post._id)
        console.log(post._id)
    }
    return (
        <div className={`${className} flex flex-col gap-3    `}>
            <div className='flex flex-row justify-between items-center w-full  '>
                <div className=' flex flex-row items-center gap-5 w-[60%]  '>
                    <NavLink to={`/profile/${userID}`} className='flex-1 flex flex-row gap-5 items-center '>
                        <img className='w-15 h-15 rounded-xl object-cover' src={profilePic} alt="" />
                        <p className='text-white text-sm'>{username}</p>
                    </NavLink>
                    <p className='flex-1  text-white text-sm'>發文 {timeAgo(post.createdAt)}</p>
                </div>
                <img onClick={() => handleSettings(post)} className='w-5 h-5 rounded-xl object-cover cursor-pointer' src={dots} alt="" />

            </div>
            <div className='w-full h-150 px-5 flex flex-row justify-center border border-gray-800 cursor-pointer'>
                <img onClick={onClick} className=' object-cover ' src={post.image_URL} alt="" /></div>

            <div className='flex flex-row justify-between px-2 py-2'>
                <div className='flex flex-row gap-2'>
                    <img src={liked ? IconHeartRed : IconHeartOutline} onClick={handleLike} className={` w-8 h-8 cursor-pointer`} />
                    <span>{likesCount}</span>
                    <img src={IconCommentOutline} onClick={onClick} className='w-8 h-8 cursor-pointer' />
                    <span>{commentsCount}</span>
                </div>
                <img src={bookmarked ? IconBookmarkPurple : IconBookmarkOutline} onClick={handleBookmark} className={` w-8 h-8 cursor-pointer`} />
            </div>

            <p className='text-justify'>{post.caption}</p>

        </div>
    )
}

export default Card