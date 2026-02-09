import React, { useState, useEffect, useRef } from 'react'
import Title from '../components/Title'
import * as Icon from 'react-feather'
import Grid from '../components/Grid'
import SearchBar from '../components/SearchBar'
import ListItemAccount from '../components/ListItemAccount'
import Filter from '../components/Filter'

import cookie from '../assets/cookie.png'
import IconVideoCall from '../assets/icon-videocall.png'
import IconCall from '../assets/icon-call.png'
import IconArrowLeft from '../assets/icon-arrow-left-5f5f5f.png'

import io from "socket.io-client"
import SidebarMobile from '../components/SidebarMobile'



const socket = io(`${import.meta.env.VITE_BACKEND_URL}`)
const Chatroom = () => {



    const [users, setUsers] = useState([])
    const onLoad = async () => {
        try {
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
        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        onLoad()
    }, [])

    //Chat Load
    const [messages, setMessages] = useState([])
    const loadChat = async (chatid) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/load/${chatid}`)
            const data = await response.json()
            console.log("messages: ", data.messages)
            setMessages(data.messages)

        } catch (error) {
            console.log(error.message)
        }
    }


    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    //Choose Chat
    const [myID, setMyID] = useState("")
    const [selectedUser, setSelectedUser] = useState("")
    const [chatID, setChatID] = useState("")
    const handleClick = async (user) => {
        setIsChat(true)
        setSelectedUser(user)
        setMessages([])

        let myID;
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/me`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            myID = data.id
            setMyID(myID)


            const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat/access`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: [data.id, user._id]
                })
            })
            const data2 = await response2.json()



            setChatID(data2.chatID)
            setChatUsers([myID, user._id])


            socket.emit("joinChat", data2.chatID)
            loadChat(data2.chatID)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    //Chat
    const [chatUsers, setChatUsers] = useState([])
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            {/* const response = await fetch("http://localhost:5000/api/chat/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    users: chatUsers,
                    message: message
                })
            })
            const data = await response.json()


                     */}

            socket.emit("sendMessage", {
                chatID,
                senderID: myID,
                message
            })
            setMessage("")
            //console.log(message)
            //console.log("message sent!", data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        // Listen for messages coming from the server
        socket.on("receiveMessage", (newMessage) => {
            setMessages(prev => [...prev, newMessage])
        })

        // Cleanup when component unmounts or chat changes
        return () => {
            socket.off("receiveMessage")
        }
    }, [])


    const [isChat, setIsChat] = useState(false)
    const handleBack = () => {
        setIsChat(false)
    }
    return (
        <div className='flex flex-row  w-full h-screen'>
            {/*Left Side */}
            <div className={`${isChat ? "hidden md:flex" : "flex"} flex-col justify-start gap-3   w-full md:w-[40%] h-full    `}>
                <div className='flex flex-col justify-end items-center w-full h-[40%] '>
                    <Title text="聊天室" />
                    <SearchBar className='w-[75%] h-10' />
                </div>

                <div className='flex flex-col gap-1 w-full h-[50%] px-5 lg:px-10 xl:px-15 overflow-auto hide-scrollbar'>
                    {/*<Filter />*/}

                    {users.map((item, index) => {
                        return (
                            <ListItemAccount key={index} user={item} handleClick={() => handleClick(item)} variant="chat" />
                        )
                    })}


                </div>

                <SidebarMobile />
            </div>
            {/*Right Side */}
            {isChat ? (
                <div style={{ backgroundColor: '#0D0D0D' }} className='flex flex-col justify-between w-full md:w-[70%] h-[90%] lg:h-full '>

                    <div style={{ backgroundColor: '#252525' }} className='w-full h-[15%] px-5 md:px-10  flex flex-row justify-between items-center  rounded-bl-2xl'>

                        <div className='flex flex-row items-center gap-3'>
                            <img onClick={() => handleBack()} src={IconArrowLeft} alt="" className='md:hidden w-10 aspect-square ' />
                            <img className='w-15 h-15 object-cover rounded-2xl' src={selectedUser.imageFile} alt="" />
                            <span>{selectedUser.username}</span>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <img className='w-10 p-2 border rounded-full bg-white' src={IconCall} alt="" />
                            <img className='w-10 p-2 border rounded-full bg-white' src={IconVideoCall} alt="" />
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#0D0D0D' }} className='w-full  h-[70%] px-5 py-5 flex flex-col gap-3 overflow-auto'>
                        {
                            messages.map((item, index) => {
                                return (
                                    <div key={index} className={`flex flex-row ${myID === item.senderID ? "justify-end" : "justify-startS"} `}>
                                        <div className='inline-flex px-5  justify-center bg-blue-500 rounded-full'>
                                            <span>{item.message}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div ref={messagesEndRef}></div>

                    </div>
                    <form onSubmit={handleSubmit} style={{ backgroundColor: "#151515" }} className='w-full h-[15%] p-5 flex flex-row gap-1 '>
                        <input value={message} onChange={(e) => setMessage(e.target.value)} style={{ backgroundColor: '#252525' }} className='w-[85%] pl-5  rounded-2xl'></input>
                        <div className='w-[15%] flex flex-row justify-center  '>
                            <button className='p-2 border rounded   cursor-pointer' >Send</button>
                            {/*<img className='w-[100%]   rounded-full' src={cookie} alt="" />*/}
                        </div>
                    </form>

                </div>
            ) : (<div className='hidden md:flex md:flex-col md:justify-center items-center w-full h-full md:w-[70%] border'>
                <span>  選擇一個聊天開始對話</span>
            </div>)
            }




        </div >
    )
}

export default Chatroom