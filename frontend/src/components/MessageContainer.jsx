import React, { useEffect, useState } from 'react'
import MessageCard from './MessageCard'
import ConversationContainer from './ConversationContainer'

const MessageContainer = () => {
    const [message, setMessage] = useState(false)


    useEffect(() => { console.log(message) }, [message])
    return (
        <div className='fixed bottom-25 right-25 flex flex-col gap-3 w-80 h-100 px-5 py-2 rounded-xl' style={{ backgroundColor: '#171923ff' }}>
            {message === false ?
                <>
                    <h1 className='pb-2 text-xl text-white border-b '>訊息</h1>
                    <div onClick={() => setMessage(prev => !prev)} >
                        <MessageCard />
                    </div>
                    <MessageCard />
                    <MessageCard />
                </>
                :

                <ConversationContainer />
            }
        </div>
    )
}

export default MessageContainer
