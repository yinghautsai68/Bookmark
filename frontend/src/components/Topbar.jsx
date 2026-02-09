import React, { useContext, useEffect, useRef, useState } from 'react'
import cookie from '../assets/cookie4.png'
import StoryPreview from './StoryPreview'
import { Context } from '../context/Context.jsx'
import ArrowLeft from '../assets/icon-arrow-left.png'
import ArrowRight from '../assets/icon-arrow-right.png'
const Topbar = () => {
    const { navigate, setStoryIndex, setStories, stories } = useContext(Context)


    const openStories = (index) => {
        setStoryIndex(index)
        localStorage.setItem("storyIndex", index)
        console.log("stories opened")
        navigate('/storiespage')
    }

    const [followings, setFollowings] = useState([])

    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/follows`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            //console.log(data.follows)
            setFollowings(data.follows)

            const followingIds = data.follows.map(item => item.followingID._id)
            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/story/get?ids=${followingIds.join(",")}`, {
                method: "GET"
            })

            const data2 = await response2.json()
            console.log(data2.stories)
            setStories(data2.stories)
            localStorage.setItem("stories", JSON.stringify(data2.stories))
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])

    const scrollRef = useRef(null)
    const scrollLeft = () => {
        if (!scrollRef.current) return
        const containerWidth = scrollRef.current.offsetWidth
        scrollRef.current.scrollBy({ left: -containerWidth, behavior: 'smooth' })
    }

    const scrollRight = () => {
        if (!scrollRef.current) return
        const containerWidth = scrollRef.current.offsetWidth
        scrollRef.current.scrollBy({ left: containerWidth, behavior: 'smooth' })
    }

    return (
        <div className=' w-full px-5 md:pl-5 flex flex-row justify-between items-center gap-3 '>
            <img onClick={scrollLeft} className=' w-10 h-10 rounded-3xl cursor-pointer ' src={ArrowLeft} alt="" />
            <div ref={scrollRef} className="flex overflow-x-auto hide-scrollbar">
                {stories.map((item, index) => (

                    <StoryPreview key={index} story={item} onClick={() => openStories(index)} className={'flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6'} />

                ))}
            </div>


            <img onClick={scrollRight} className=' w-10 h-10 rounded-3xl cursor-pointer' src={ArrowRight} alt="" />
        </div>
    )
}

export default Topbar