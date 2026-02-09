import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["follow", "like", "comment"] },
    contentType: { type: String, enum: ["Post", "Story"] },
    contentID: { type: mongoose.Schema.Types.ObjectId, refPath: "contentType" },
    isRead: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model("Notification", notificationSchema, "notifications")