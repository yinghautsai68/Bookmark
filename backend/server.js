//IMPORT
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import postRoutes from './routes/postRoutes.js'
import postBookmarkRoutes from './routes/postBookmarkRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import storyRoutes from './routes/storyRoutes.js'
import storyLikeRoutes from './routes/storyLikeRoutes.js';
import storyBookmarkRoutes from './routes/storyBookmarkRoutes.js'
import followRoutes from './routes/followRoutes.js'
import chatRoutes from './routes/chatRoutes.js'


import http from "http"
//SETTINGS
dotenv.config()

//SERVER
const app = express()
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)

//MIDDLEWARE
// Handle preflight requests for all routes
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://yinghautsai68.github.io",
        "https://bookmark-frontend-gamma.vercel.app"
    ],
    credentials: true
}));
app.use(express.json())
app.use('/uploads', express.static(join(__dirname, 'uploads')));


connectDB();
//ROUTES
app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/api/user', userRoutes);
app.use('/api/notification', notificationRoutes)
app.use('/api/post', postRoutes);
app.use('/api/postbookmark', postBookmarkRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/story', storyRoutes);
app.use('/api/storylike', storyLikeRoutes)
app.use('/api/storybookmark', storyBookmarkRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/chat', chatRoutes)

import { Server } from "socket.io"
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
// minimal socket logic
import Message from './models/message.js'
import PostComment from './models/postComment.js';
io.on("connection", (socket) => {
    socket.on("joinChat", (chatID) => {
        socket.join(chatID)
    })

    socket.on("sendMessage", async ({ chatID, senderID, message }) => {
        const newMessage = await Message.create({ chatID, senderID, message })

        // send to everyone in the chat including sender
        io.to(chatID).emit("receiveMessage", newMessage)
    })

})

io.on("connection", (socket) => {
    console.log("User connected")

    socket.on("joinPost", (postID) => {
        socket.join(postID)
        console.log(`User joined post ${postID}`)
    })

    socket.on("postComment", async ({ postID, userID, text }) => {
        const newComment = await PostComment.create({
            postID: postID,
            userID: userID,
            text: text
        })

        const populatedComment = await PostComment.findById(newComment._id)
            .populate("userID")
        io.to(postID).emit("newComment", populatedComment)
    })
})


//Check if server running
server.listen(PORT, () => {
    console.log('working!')
})
