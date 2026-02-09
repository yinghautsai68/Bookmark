import React from 'react'
import cookie from '../assets/cookie.png'
const Notification = ({ item }) => {
    //Notificaiton Text
    let notificationText = ""
    if (item.type === "follow") {
        notificationText = "開始追蹤你!"
    }
    else if (item.type === "like") {
        if (item.contentType === "Post") {
            notificationText = "給你文章按讚!"
        } else if (item.contentType === "Story") {
            notificationText = "給你限時按讚!"
        }

    } else if (item.type === "comment") {
        if (item.contentType === "Post") {
            notificationText = "在你文章留言!"
        }
    }

    //Notification Image
    let notificationImage = ""
    if (item.contentType === "Post") {
        notificationImage = item.contentID.image_URL
    } else if (item.contentType === "Story") {
        notificationImage = item.contentID.image
    } else {
        notificationImage = item.receiverID.imageFile
    }
    return (
        <div className='flex flex-row justify-between   rounded-xl'>
            <img className='w-15 h-15 rounded-2xl object-cover' src={item.senderID.imageFile} alt="" />
            <div className='flex flex-col justify-center'>
                <span>{item.senderID.username}</span>
                <span>{notificationText}</span>
            </div>
            <img className='w-15 h-15 object-cover' src={notificationImage} alt="" />
        </div>
    )
}

export default Notification