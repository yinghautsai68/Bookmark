import React, { useState, useEffect, useContext } from 'react'
import StoryCard from '../components/StoryCard.jsx'
import { Context } from '../context/Context.jsx'
import { NavLink } from 'react-router-dom'



const StoriesPage = ({ }) => {
    const { storyIndex } = useContext(Context)
    const [posts, setPosts] = useState([])
    const onLoad = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/story/get")

            const data = await response.json()
            console.log(data)
            setPosts(data.stories)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        onLoad()
    }, [])

    const [index, setIndex] = useState(storyIndex)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const activeWidth = isMobile ? 300 : 400
    const inactiveWidth = 200

    const handlePrev = () => {
        setIndex((prev) => Math.max(prev - 1, 0))
    }

    const handleNext = () => {
        setIndex((prev) => Math.min(prev + 1, posts.length - 1))
    }

    useEffect(() => {
        console.log(index)
    }, [index])


    const [translateXValue, setTranslateXValue] = useState(0)
    useEffect(() => {
        const value = `translateX(calc(50% - ${index * inactiveWidth + activeWidth / 2}px))`
        setTranslateXValue(value)
    }, [isMobile, index])

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', onResize)

    }, [])
    return (
        /*Page*/
        < div className='relative w-full h-screen flex flex-row  overflow-hidden' >
            <button className='hidden lg:block absolute left-2 top-2 p-2  bg-purple-900 cursor-pointer z-5'>
                <NavLink to='/home'>回去首頁</NavLink>
            </button>
            {/*Stories Container*/}
            <div style={{ transform: translateXValue }} className='flex flex-row items-center  w-full h-screen transition-all duration-300 '>
                {
                    posts.map((item, i) => {
                        return (
                            <StoryCard key={i} i={i} index={index} story={item} handlePrev={handlePrev} handleNext={handleNext} className={`  ${index === i ? `w-[300px] md:w-[400px] h-[600px]` : ` w-[200px] h-[400px]`}   transition-all duration-400`} />
                        )
                    })
                }
            </div>
        </div >
    )
}

export default StoriesPage