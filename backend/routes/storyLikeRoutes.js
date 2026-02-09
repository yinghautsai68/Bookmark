import express from "express"
import protect from "../middleware/protect.js"
import StoryLike from "../models/storyLike.js"
const router = express.Router()

router.post("/:storyID/like", protect, async (req, res) => {
    try {
        const { storyID } = req.params

        const likedStatus = await StoryLike.findOne({
            storyID: storyID,
            userID: req.user._id
        })
        if (!likedStatus) {
            const storyLike = new StoryLike({
                userID: req.user._id,
                storyID: storyID
            })
            await storyLike.save()
            res.status(200).json({ message: "liked story" })
        } else {
            await likedStatus.deleteOne()
            res.status(200).json({ message: "unliked story" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/:storyID/likestatus", protect, async (req, res) => {
    try {
        const { storyID } = req.params
        const likeStatus = await StoryLike.findOne({
            storyID: storyID,
            userID: req.user._id
        })
        if (likeStatus) {
            res.status(200).json({ likeStatus: true })
        } else {
            res.status(200).json({ likeStatus: false })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router