const mongoose = require("mongoose");

// This is schema for global messages, hence only sender and message are required.
const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { collection: "chats" });
module.exports = mongoose.model("Chat", chatSchema);