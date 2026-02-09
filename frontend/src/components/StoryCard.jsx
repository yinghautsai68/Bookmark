import React, { useState, useEffect } from 'react'
import cookie from '../assets/cookie4.png'

import * as Icon from 'react-feather'

import IconHeartOutline from '../assets/icon-heart-outline.png'
import IconHeartRed from '../assets/icon-heart-red.png'
import IconCommentOutline from '../assets/icon-comment-outline.png'
import IconBookmarkOutline from '../assets/icon-bookmark-outline.png'
import IconBookmarkPurple from '../assets/icon-bookmark-purple.png'
import IconArrowLeft from '../assets/icon-arrow-left.png'
import IconArrowRight from '../assets/icon-arrow-right.png'
import IconDots from '../assets/icon-dots.png'

const StoryCard = ({ i, index, story, className, handlePrev, handleNext, setStories }) => {
    const isActive = i === index

    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/storylike/${story._id}/like`, {
                method: 'POST',
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log(data)
            setLiked(prev => !prev)

            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/story/${story._id}/like`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()
            console.log(data2.notification)
        } catch (error) {
            console.log(error)
        }
    }

    //like Status
    const [liked, setLiked] = useState(false)
    const getLikeStatus = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/storylike/${story._id}/likestatus`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log(data)
            setLiked(data.likeStatus)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getLikeStatus()
    }, [])

    const handleBookmark = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/storybookmark/${story._id}/bookmark`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()
            console.log(data)
            setBookmarked(data.bookmarkStatus)
        } catch (error) {
            console.log(error.message)
        }
    }

    const [bookmarked, setBookmarked] = useState(false)
    const getBookmarkStatus = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/storybookmark/${story._id}/bookmarkstatus`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            //console.log("getbookmarkstatus:", data.bookmarkStatus)
            setBookmarked(data.bookmarkStatus)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getBookmarkStatus()
    }, [])


    const [settingsStoryID, setSettingsStoryID] = useState("")
    useEffect(() => {
        console.log(settingsStoryID)
    }, [settingsStoryID])

    const handleDelete = async (settingsStoryID) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/story/${settingsStoryID}/delete`, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            setStories(prev => prev.filter((item) => item._id !== settingsStoryID))

        } catch (error) {
            console.log(error.message)
        }
    }

    const time = (createdAt) => {
        const currentDate = new Date()
        const postDate = new Date(createdAt)
        const difference = currentDate - postDate //miliseconds

        const seconds = Math.floor(difference / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const weeks = Math.floor(days / 7)
        const months = Math.floor(days / 30)
        const years = Math.floor(days / 365)


        if (seconds < 60) return `${seconds} 秒前`
        if (minutes < 60) return `${minutes} 分鐘前`
        if (hours < 24) return `${hours} 小時前`
        if (days < 7) return `${days} 天前`
        if (weeks < 4) return `${weeks} 週前`
        if (months < 12) return `${months} 個月前`
        return `${years} 年前`
    }


    return (
        <div className='relative w-full h-full  flex flex-col justify-center '>
            {/*Overlay*/}
            <div className='absolute flex flex-col justify-center items-center w-full   z-5  '>
                <img onClick={handlePrev} src={IconArrowLeft} className={`${isActive ? 'opacity-100' : 'opacity-0'} w-10 h-10 absolute left-0 z-6 cursor-pointer  transition-all duration-500`} alt="" />
                <div className={`${isActive ? 'opacity-0' : 'opacity-100'} flex  flex-col items-center gap-1 transition-all duration-200`}>
                    <img src={story.userID.imageFile} alt="" className='w-15 h-15 rounded-2xl' />
                    <span>{story.userID.username}</span>
                </div>
                <img onClick={handleNext} src={IconArrowRight} className={`${isActive ? 'w-10 h-10' : 'w-0 h-0'} absolute z-6 right-0  cursor-pointer transition-all duration-300`} alt="" />
            </div>
            {/*StoryCard*/}
            <div className={`relative ${isActive ? 'gap-2' : 'text-[10px] opacity-30'}   flex flex-row justify-center items-start shrink-0   ${className}  z-4 text-xs md:text-sm `}>
                <div className={`${isActive ? 'w-[80%]' : 'w-[80%]'}  h-[95%] lg:h-full flex flex-col gap-2 rounded-2xl bg-black transition-all`}>
                    <div className='w-full h-[14%] p-4 flex flex-row justify-between items-center gap-4 rounded-2xl bg-gray-800'>
                        <div className={` ${isActive ? 'opacity-100' : 'opacity-0'} flex flex-row justify-between items-center gap-5 w-full transition-all duration-500`}>
                            <img className={`${isActive ? 'w-10 md:w-15 aspect-square rounded-2xl' : 'w-10 aspect-square rounded-xl'}  object-cover transition-all`} src={story.userID.imageFile} alt="" />
                            <div className='flex flex-col'>
                                <div className='flex flex-row gap-2'>
                                    <span className=''>{story.userID.username}</span>
                                    <span>{time(story.createdAt)}</span>
                                </div>
                                <p className=''>{story.caption}</p>
                            </div>
                            <img onClick={() => setSettingsStoryID(story._id)} className={`${isActive ? 'w-5' : 'w-10'} rounded-2xl object-cover cursor-pointer transition-all`} src={IconDots} alt="" />
                        </div>

                    </div>
                    <div className='relative flex flex-row justify-center  h-[85%]'>
                        <img className='w-full h-full object-cover transition-all' src={story.image} alt="" />
                        <div className='absolute bottom-0 w-full p-3 flex flex-row justify-between '>
                            <img src={liked ? IconHeartRed : IconHeartOutline} onClick={() => handleLike()} className={` ${isActive ? 'opacity-100' : 'opacity-0'} w-8 h-8 cursor-pointer transition-all`} />
                            <img src={bookmarked ? IconBookmarkPurple : IconBookmarkOutline} onClick={() => handleBookmark()} className={` ${isActive ? 'opacity-100' : 'opacity-0'} w-8 h-8 cursor-pointer transition-all`} />
                        </div>
                    </div>
                </div>

            </div >


            {
                settingsStoryID &&
                <div className='absolute left-0 right-0 w-full flex flex-row justify-center z-50 '>
                    <ul className='p-5 bg-gray-800 rounded-lg'>
                        <li onClick={() => handleDelete(settingsStoryID)} className='cursor-pointer'>刪除</li>
                        <li onClick={() => setSettingsStoryID("")} className='cursor-pointer'>取消</li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default StoryCard