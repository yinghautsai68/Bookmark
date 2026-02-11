import React, { useEffect, useState, useContext, useRef } from 'react'
import cookie from '../assets/cookie4.png'
import cookiebg from '../assets/cookie.png'
import IconDots from '../assets/icon-dots.png'

import { Context } from '../context/Context'
import Button from '../components/Button'
import PostDetail from '../components/PostDetail'

import { useParams } from "react-router-dom"
import FollowList from '../components/FollowList'

import SidebarMobile from '../components/SidebarMobile'
const Profile = () => {
    const { navigate } = useContext(Context)

    const { id } = useParams()

    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [profilePic, setProfilePic] = useState("")

    const [postsCount, setPostsCount] = useState(0)
    const [followersCount, setFollowersCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const [createdAt, setCreatedAt] = useState("")

    const [posts, setPosts] = useState([])
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const imageInputRef = useRef(null)
    const formDate = (isoString) => {
        const date = new Date(isoString)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return `${year}年${month}月${day}日`
    }

    const [selectedPost, setSelectedPost] = useState(null)
    const onLoad = async () => {
        const token = localStorage.getItem('token')

        let response
        if (id) {
            response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
        } else {
            response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

        }

        const data = await response.json()
        console.log(data)
        setUsername(data.username)
        setBio(data.bio)
        setProfilePic(data.profilePic)
        setCreatedAt(data.createdAt)

        let response2
        if (id) {
            response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/${id}`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })

        } else {
            response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/me`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
        }

        const data2 = await response2.json()

        console.log(data2)
        setPosts(data2.posts)
        setPostsCount(data2.posts.length)
        //Following Count
        const response3 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/follows`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        const data3 = await response3.json()
        console.log("followingcount", data3.follows.length)
        setFollowingCount(data3.follows.length)
        console.log("following", data3.follows)
        setFollowing(data3.follows)

        //Followers Count 
        const response4 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/followers`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        const data4 = await response4.json()
        console.log("followerscount", data4.followers.length)
        setFollowersCount(data4.followers.length)
        setFollowers(data4.followers)
    }
    useEffect(() => {
        onLoad()
    }, [id])


    //check followers
    const handleFollowersClick = () => {
        console.log(followers)
        setFollowList("followers")

    }


    //check following
    const handleFollowingClick = () => {
        console.log(following)
        setFollowList("following")
    }
    const [followList, setFollowList] = useState("")

    const [listTitle, setListTitle] = useState("")
    const [list, setList] = useState([])

    useEffect(() => {
        if (followList === "followers") {
            setListTitle("Followers")
            setList(followers)
        } else if (followList === "following") {
            setListTitle("Following")
            setList(following)
        }
    }, [followList])


    const handleCheckFollowClick = (item) => {
        console.log("check follow clicked!")
        if (followList === "followers") {
            navigate(`/profile/${item.followerID._id}`)
            setFollowList("")
        } else if (followList === "following") {
            navigate(`/profile/${item.followingID._id}`)
            setFollowList("")
        }


    }

    const handleUnfollow = async (item) => {
        try {
            const token = localStorage.getItem("token")
            let response;
            let data;
            if (followList === "followers") {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/follower/${item.followerID._id}`, {
                    method: "DELETE",
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                data = await response.json()
                console.log(data)
                onLoad()
            } else if (followList === "following") {
                response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/follow/following/${item.followingID._id}`, {
                    method: "DELETE",
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                })
                data = await response.json()
                console.log(data)
                onLoad()
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const [edit, setEdit] = useState(false)
    const [newBio, setNewBio] = useState("")
    const [newProfilePicture, setNewProfilePicture] = useState(null)
    const [previewPic, setPreviewPic] = useState(null)
    const handleEditSubmit = async () => {
        try {
            const token = localStorage.getItem("token")
            const formData = new FormData()
            formData.append("newBio", newBio)
            formData.append("newProfilePicture", newProfilePicture)
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/edit`, {
                method: "PATCH",
                headers: {
                    "authorization": `Bearer ${token}`
                },
                body: formData
            })

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className='w-full h-full flex  flex-col md:flex-row gap-2 md:gap-5'>
            {/*Desktop*/}
            <div className='hidden md:flex flex-col gap-3 w-[35%] h-[90%] lg:h-full    '>
                <div className='h-[25%] p-5 flex flex-row justify-between items-center gap-5 bg-cover bg-center bg-black/50 bg-blend-darken' style={{ backgroundImage: `url(${cookiebg})` }}>
                    <div className='flex flex-row items-center gap-5'>
                        <img className='w-15 aspect-square rounded-2xl object-cover cursor-pointer ' src={profilePic} alt="" />
                        <div className='flex flex-col justify-between pt-10 pb-7'>
                            <h1 className='text-md'>{username}</h1>
                            <div className='flex flex-row gap-2'>
                                <div className='text-sm'>
                                    <p>文章</p>
                                    <span>{postsCount}</span>
                                </div>
                                <div onClick={() => handleFollowersClick()} className='text-sm cursor-pointer'>
                                    <p>粉絲</p>
                                    <span>{followersCount}</span>
                                </div>
                                <div onClick={() => handleFollowingClick()} className='text-sm cursor-pointer'>
                                    <p>追蹤</p>
                                    <span>{followingCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div style={{ backgroundColor: '#1D1C1C' }} className='h-[70%] p-5 flex flex-col items-center gap-5 bg-gray-900 rounded-bl-3xl rounded-br-3xl '>
                    <div className='flex-1 w-full flex flex-col '>
                        <span>成為成員時間</span>
                        <span>{formDate(createdAt)}</span>
                    </div>

                    <div className='flex-1 w-full flex flex-col '>
                        <span>個人簡介</span>
                        <span>{bio}</span>
                    </div>



                    <div className='flex-1 flex flex-row justify-center  items-end gap-2 w-full '>
                        <Button onClick={() => setEdit(true)} className="flex-1 h-10 rounded text-xs " text="編輯資料"></Button>
                        <Button className="flex-1 h-10 rounded text-xs" text="限時"></Button>
                    </div>
                </div>
            </div>

            {/*Mobile*/}
            <div className='flex md:hidden flex-col justify-end items-center gap-2 w-full h-[40%] px-2 pb-2 bg-cover bg-center bg-black/50 bg-blend-darken ' style={{ backgroundImage: `url(${cookiebg})` }}>

                <div className='flex flex-row justify-between items-center gap-2 w-[90%] '>
                    <div className='flex flex-row gap-5'>
                        {/*Profile Pic*/}
                        <div className=" overflow-hidden ">
                            <img
                                src={profilePic}
                                className="w-15 md:w-20 lg:w-24 aspect-square rounded-2xl object-cover"
                            />
                        </div>
                        {/*Profile Info*/}
                        <div className='flex flex-col justify-between  '>
                            <h1 className='text-sm'>{username}</h1>
                            <div className='flex flex-row gap-2 '>
                                <div className='text-xs'>
                                    <p>文章</p>
                                    <span>{postsCount}</span>
                                </div>
                                <div onClick={() => handleFollowersClick()} className='text-xs cursor-pointer'>
                                    <p>粉絲</p>
                                    <span>{followersCount}</span>
                                </div>
                                <div onClick={() => handleFollowingClick()} className='text-xs cursor-pointer'>
                                    <p>追蹤</p>
                                    <span>{followingCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img onClick={() => setEdit(true)} src={IconDots} alt="" className='w-7 aspect-square object-cover cursor-pointer' />
                </div>


                <div className='flex flex-col w-[90%] px-5 py-2  bg-[#1D1C1C]/70 text-xs'>
                    <span>個人簡介</span>
                    <span>{bio}</span>
                </div>

                <div className='flex flex-row gap-2 w-full '>
                    <Button className="flex-1 rounded text-xs " text="編輯個人資料"></Button>
                    <Button className="flex-1 rounded text-xs" text="限時"></Button>
                </div>
            </div>


            {/*Grid*/}
            <div className="w-full md:w-[65%] h-[50%] md:h-full   overflow-auto hide-scrollbar">
                <div className=' grid grid-cols-3 gap-1'>
                    {posts.map((item) => (
                        <div
                            onClick={() => setSelectedPost(item)}
                            key={item._id}
                            className="w-full aspect-square overflow-hidden"
                        >
                            <img
                                src={item.image_URL}
                                alt=""
                                className="w-full h-full object-cover hover:opacity-50 transition cursor-pointer"
                            />
                        </div>
                    ))}
                </div>

            </div>
            {
                edit &&
                <div onClick={() => setEdit(false)} className='fixed left-0 w-full h-screen flex flex-row justify-center items-center'>
                    <div onClick={(e) => e.stopPropagation()} className='w-[30%] h-[55%] p-5 flex flex-col items-center  bg-black '>
                        <span className='text-xl'>編輯個人檔案</span>
                        <form onSubmit={handleEditSubmit} className='w-full flex flex-col gap-2'>
                            <div className='w-full flex flex-row justify-center items-center'>
                                <span className='w-[50%] text-center'>個人簡介</span>
                                <textarea onChange={(e) => setNewBio(e.target.value)} className='w-[50%] h-[50] p-2 border border-gray-600'></textarea>

                            </div>
                            <div className='w-full flex flex-row justify-center items-center'>
                                <span className='w-[50%]  text-center'>個人簡介</span>
                                <div onClick={() => imageInputRef.current.click()} className='w-[50%] h-50 border bg-cover bg-center border-gray-600' style={{
                                    backgroundImage: previewPic ? `url(${previewPic})` : "none"
                                }}></div>
                                <input ref={imageInputRef} onChange={(e) => {
                                    setNewProfilePicture(e.target.files[0])
                                    setPreviewPic(URL.createObjectURL(e.target.files[0]))
                                }} type="file" className='hidden pl-2 flex-1 border' />
                            </div>
                            <button className='bg-blue-500 cursor-pointer'>儲存</button>
                        </form>
                    </div>
                </div>
            }
            {
                selectedPost && (
                    <PostDetail setPosts={setPosts} post={selectedPost} setSelectedPost={setSelectedPost} />
                )
            }
            {
                followList !== "" && (
                    <div onClick={() => setFollowList("")} className='fixed  left-0 top-0 w-full h-screen flex flex-row justify-center items-center bg-black/50'>
                        <div onClick={(e) => e.stopPropagation()} className='p-5 flex flex-col items-center rounded-md bg-gray-800'>
                            <h1>{listTitle} List</h1>
                            <ul className='flex flex-col gap-2 '>
                                {list.map((item, index) => {
                                    return (
                                        <li key={index} className='w-full flex flex-row justify-between items-center gap-3 cursor-'>
                                            <span onClick={() => handleCheckFollowClick(item)} className='cursor-pointer'>
                                                {followList === "followers"
                                                    ? item.followerID.username
                                                    : item.followingID.username}
                                            </span>
                                            <button onClick={() => handleUnfollow(item)} className='p-2  rounded-md bg-red-500 cursor-pointer'>Unfollow</button>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Profile