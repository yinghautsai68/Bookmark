import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Title from '../components/Title'
import News from '../components/News'
import MessageButton from '../components/MessageButton'


import MessageContainer from '../components/MessageContainer'
import Button from '../components/Button'
import Notifications from '../components/Notifications'
import PostDetail from '../components/PostDetail'
import CardSettings from '../components/CardSettings'
import HomeTitle from '../components/HomeTitle'
import SidebarMobile from '../components/SidebarMobile'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [notifications, setNotifications] = useState([])

    const [selectedPost, setSelectedPost] = useState(null)


    const onLoad = async () => {
        try {
            const token = localStorage.getItem("token")
            //feed
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/feed`)
            const data = await response.json()
            //console.log(data)
            setPosts(data.posts)

            //notification
            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/notifications`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()
            console.log(data2.notifications)
            setNotifications(data2.notifications)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        onLoad()
    }, [])




    const [settingsPostID, setSettingsPostID] = useState("")
    return (
        <div className='w-full h-full pt-5 lg:pr-5 xl:pr-0 flex flex-row gap-0 bg-black text-gray-400 '>
            <div className='w-full lg:w-[70%]  flex flex-col justify-start items-center gap-5 overflow-auto hide-scrollbar  '>
                <HomeTitle />
                <Topbar />
                <div className='w-full md:w-[60%]    px-5 mb-15 flex flex-col justify-center items-center gap-15 '>
                    {posts.map((item) => {
                        return (

                            <Card onClick={() => setSelectedPost(item)} setSettingsPostID={setSettingsPostID} key={item._id} post={item} className={'w-full'} />

                        )
                    })}
                </div>
            </div>
            <div className='hidden   w-[30%] pt-15  lg:flex flex-col  items-center gap-3'>
                <Title text={'BookMark'} />
                <span className='text-2xl'>通知</span>
                {/*   <News />*/}
                <Notifications notifications={notifications} />
            </div >
            {/*   <MessageContainer /> <MessageButton />*/}



            {selectedPost &&
                <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />
            }
            {
                settingsPostID &&
                <CardSettings settingsPostID={settingsPostID} setSettingsPostID={setSettingsPostID} setPosts={setPosts} />
            }
        </div >
    )
}

export default Home