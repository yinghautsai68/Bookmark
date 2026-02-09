import React from 'react'
import Notification from './Notification'

const Notifications = ({ notifications }) => {
    return (
        <div className='w-full max-w-[250px] h-[250px] flex flex-col gap-2 overflow-y-auto hide-scrollbar'>
            {
                notifications.map((item, index) => {
                    return (
                        <Notification item={item} />
                    )
                })
            }


        </div>
    )
}

export default Notifications