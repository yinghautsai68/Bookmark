import React, { useContext, useEffect, useState } from 'react'
import cookie from '../assets/cookie.png'
import Button from '../components/Button'
import { Context } from '../context/Context'
const ListItemAccount = ({ variant = "default", user, handleClick, handleFollow, followingIDs = [] }) => {

    const isFollowing = followingIDs.includes(user._id) || false

    const { navigate } = useContext(Context)

    {/*const handleClick = (user) => {
        if (variant === "search") {
            console.log("clicked")
            navigate(`/profile/${user._id}`)
        } else if (variant === "chat") {
            handleClick(user._id)
        }
    }
    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])
    */}
    return (
        <div onClick={() => handleClick(user)} className='flex flex-row justify-between items-center cursor-pointer'>
            <div className='flex flex-row gap-3'>
                <img className='w-15 h-15 rounded-xl object-cover' src={user.imageFile} alt="" />
                <div className='flex flex-col'>
                    <span>{user.username}</span>
                    {
                        variant === "search" && (
                            <span>{user.bio}</span>
                        )
                    }
                    {
                        variant === "chat" && (
                            <span>hello! * 1 小時前 </span>
                        )
                    }
                </div>
            </div>
            {
                variant === "search" && (
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        handleFollow(user._id)
                    }


                    } className={`${isFollowing ? "hidden" : ""} h-[50%]`} text="follow" />
                )
            }


        </div>
    )
}

export default ListItemAccount