import express from "express"
import protect from "../middleware/protect.js"
import Notification from "../models/notification.js"
import Post from "../models/post.js"
import Story from "../models/story.js"

const router = express.Router()

router.post("/post/:postID/like", protect, async (req, res) => {
    try {
        const { postID } = req.params

        //post information
        const post = await Post.findById(postID)

        let notification = ""
        notification = await Notification.findOne({
            contentID: postID,
            senderID: req.user._id,
            receiverID: post.userID,
            type: "like",
            contentType: "Post"
        })
        if (notification) {
            res.status(200).json({ notification })
            return;
        }
        notification = new Notification({
            senderID: req.user._id,
            receiverID: post.userID,
            type: "like",
            contentType: "Post",
            contentID: postID,
        })

        await notification.save()
        res.status(200).json({ notification })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post("/post/:postID/comment", protect, async (req, res) => {
    try {
        const { postID } = req.params

        //post information
        const post = await Post.findById(postID)

        if (req.user._id.toString() !== post.userID.toString()) {

            let notification = new Notification({
                senderID: req.user._id,
                receiverID: post.userID,
                type: "comment",
                contentType: "Post",
                contentID: postID,
            })

            await notification.save()
            res.status(200).json({ notification })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/story/:storyID/like", protect, async (req, res) => {
    try {
        const { storyID } = req.params

        //post information
        const story = await Story.findById(storyID)

        let notification = ""
        notification = await Notification.findOne({
            contentID: storyID,
            senderID: req.user._id,
            receiverID: story.userID,
            type: "like",
            contentType: "Story"
        })
        if (notification) {
            res.status(200).json({ notification })
            return;
        }
        notification = new Notification({
            senderID: req.user._id,
            receiverID: story.userID,
            type: "like",
            contentType: "Story",
            contentID: storyID,
        })

        await notification.save()
        res.status(200).json({ notification })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post("/follow/:receiverID", protect, async (req, res) => {
    try {
        const { receiverID } = req.params

        let notification = new Notification({
            senderID: req.user._id,
            receiverID: receiverID,
            type: "follow",
            contentType: null,
            contentID: null,
        })

        await notification.save()
        res.status(200).json({ notification })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/notifications", protect, async (req, res) => {
    try {
        const notifications = await Notification.find({ receiverID: req.user._id })
            .sort({ createdAt: -1 })
            .populate("senderID")
            .populate("receiverID")
            .populate("contentID")

        res.status(200).json({ notifications })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router