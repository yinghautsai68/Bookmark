import mongoose from "mongoose";
import express from "express"
import protect from "../middleware/protect.js";
import Follow from "../models/follow.js";

const router = express.Router()


router.get("/follows", protect, async (req, res) => {
    try {
        const follows = await Follow.find({ followerID: req.user._id }).populate("followingID")

        res.status(200).json({ follows })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get("/followers", protect, async (req, res) => {
    try {
        const followers = await Follow.find({ followingID: req.user._id }).populate("followerID")
        res.status(200).json({ followers })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/:followingID', protect, async (req, res) => {
    try {
        const { followingID } = req.params


        const follow = new Follow({
            followerID: req.user._id,
            followingID: followingID
        })

        await follow.save()

        res.status(200).json({ message: "follow sucess" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete("/follower/:followerID", protect, async (req, res) => {
    try {
        const { followerID } = req.params
        const follow = await Follow.findOneAndDelete({
            followerID: followerID,
            followingID: req.user._id
        })
        res.status(200).json({ message: "deleted: " + follow })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete("/following/:followingID", protect, async (req, res) => {
    try {
        const { followingID } = req.params
        const follow = await Follow.findOneAndDelete({
            followerID: req.user._id,
            followingID: followingID
        })
        res.status(200).json({ message: "deleted: " + follow })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
export default router