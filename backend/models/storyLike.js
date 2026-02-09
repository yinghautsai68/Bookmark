import mongoose from 'mongoose'

const storyLikeSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId },
    storyID: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true })

export default mongoose.model("StoryLike", storyLikeSchema, "storylikes")