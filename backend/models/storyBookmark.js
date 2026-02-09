import mongoose from "mongoose"

const storyBookmarkSchema = new mongoose.Schema({
    storyID: { type: mongoose.Schema.Types.ObjectId },
    userID: { type: mongoose.Schema.Types.ObjectId }
})

export default mongoose.model("StoryBookmark", storyBookmarkSchema, "storybookmarks")