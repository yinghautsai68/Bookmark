import React, { useState, useEffect, useRef, useContext } from 'react'
import Title from '../components/Title'
import * as Icon from 'react-feather'
import Grid from '../components/Grid'
import SearchBar from '../components/SearchBar'
import ListItemAccount from '../components/ListItemAccount'
import PostDetail from '../components/PostDetail'
import { Context } from '../context/Context'
import SidebarMobile from '../components/SidebarMobile'

const Search = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])

    const [followingIDs, setFollowingIDs] = useState([])

    const [search, setSearch] = useState("")
    const [selectedPost, setSelectedPost] = useState('')

    const onLoad = async () => {
        try {
            //get Token
            const token = localStorage.getItem("token")


            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/users`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()

            console.log(data)
            setUsers(data.users)

            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/search`)
            const data2 = await response2.json()
            console.log("users:" + data2.posts)
            setPosts(data2.posts)

            const response3 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/follows`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data3 = await response3.json()
            console.log(data3)
            setFollowingIDs(data3.follows.map(item => item.followingID._id))


        } catch (error) {
            console.log(error.message)
        }
    }

    //Search
    const handleSearch = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/search/username/${search}`)
            const data = await response.json()
            setUsers(data.user)

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        if (!search) {
            onLoad()
            return
        } else {
            handleSearch()
        }
    }, [search])
    useEffect(() => {
        console.log(followingIDs)
    }, [followingIDs])

    //Profile
    const { navigate } = useContext(Context)
    const [selectedUser, setSelectedUser] = useState("")
    const handleClick = (user) => {
        setSelectedUser(user)
    }
    useEffect(() => {
        console.log(selectedUser)
        if (selectedUser) {
            navigate(`/profile/${selectedUser._id}`)
            setSelectedUser("")
        }

    }, [selectedUser])

    //Follow
    const handleFollow = async (followingID) => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/${followingID}`, {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)

            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notification/follow/${followingID}`, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data2 = await response2.json()
            console.log(data2)
        } catch (error) {
            console.log(error.message)
        }
    }


    const [show, setShow] = useState('users')
    return (
        <div className='w-full h-screen '>

            {selectedPost && (
                <PostDetail post={selectedPost} setSelectedPost={setSelectedPost} />
            )}

            {/*Mobile */}
            <div className='block md:hidden w-full h-full'>
                <div className='w-full h-[40%] pb-2 flex flex-col justify-end items-center '>
                    <Title text="搜尋" />
                    <SearchBar setSearch={setSearch} className='md:w-[75%] h-10' />
                    <div className='flex flex-row gap-5'>
                        <span onClick={() => setShow('users')}>users</span>
                        <span onClick={() => setShow('posts')}>posts</span>
                    </div>
                </div>
                {
                    show === "users"
                    &&
                    <div className='w-full h-[50%] px-5 flex flex-col gap-3  overflow-auto hide-scrollbar'>
                        {users.map((item, index) => {
                            return (
                                <ListItemAccount key={item._id} user={item} variant='search' handleClick={() => handleClick(item)} handleFollow={handleFollow} followingIDs={followingIDs} />
                            )
                        })}
                    </div>
                }
                {
                    show === 'posts' &&
                    <Grid setSelectedPost={setSelectedPost} posts={posts} className={'w-full h-[50%]'} />
                }

            </div>




            {/*Desktop*/}
            <div className='hidden md:flex flex-row w-full h-[90%]  lg:h-full'>
                {/*Left Side */}
                <div className=' flex flex-col justify-start gap-3 w-[40%] h-full  overflow-auto hide-scrollbar '>
                    <div className=' flex flex-col justify-end items-center  w-full h-[40%]  '>
                        <Title text="搜尋" />
                        <SearchBar setSearch={setSearch} className='md:w-[75%] h-10' />
                    </div>
                    <div className='flex flex-col gap-3  w-full h-[50%]  px-5 lg:px-10 xl:px-15 overflow-auto hide-scrollbar '>
                        {users.map((item, index) => {
                            return (
                                <ListItemAccount key={item._id} user={item} variant='search' handleClick={() => handleClick(item)} handleFollow={handleFollow} followingIDs={followingIDs} />
                            )
                        })}
                    </div>

                </div>
                {/*Right Side */}
                <Grid setSelectedPost={setSelectedPost} posts={posts} className={'w-[70%]'} />
            </div>

        </div >

    )
}

export default Search