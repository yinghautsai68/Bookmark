import React from 'react'
import cookie from '../assets/cookie4.png'
const StoryPreview = ({ onClick, className, story }) => {
    return (

        <div
            onClick={onClick}
            className={`${className} px-1 aspect-square flex flex-col justify-center items-center cursor-pointer`}
        >
            <img className="w-full aspect-square rounded-3xl object-cover" src={story.image} alt="" />
            <p className="text-center">{story.userID.username}</p>
        </div >


    )
}

export default StoryPreview