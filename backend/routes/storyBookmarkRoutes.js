import express from "express"
import protect from "../middleware/protect.js"
import StoryBookmark from "../models/storyBookmark.js"

const router = express.Router()

router.post("/:storyID/bookmark", protect, async (req, res) => {
    try {
        const { storyID } = req.params
        const bookmarkStatus = await StoryBookmark.findOne({
            storyID: storyID,
            userID: req.user._id
        })
        if (!bookmarkStatus) {
            const bookmark = new StoryBookmark({
                storyID: storyID,
                userID: req.user._id
            })
            await bookmark.save()
            res.status(200).json({ bookmarkStatus: true })
        } else {
            await bookmarkStatus.deleteOne()
            res.status(200).json({ bookmarkStatus: false })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:storyID/bookmarkstatus", protect, async (req, res) => {
    try {
        const { storyID } = req.params
        const bookmarkStatus = await StoryBookmark.findOne({
            storyID: storyID,
            userID: req.user._id
        })
        res.status(200).json({ bookmarkStatus: !!bookmarkStatus })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router