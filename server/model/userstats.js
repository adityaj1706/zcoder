const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    bookmarks: {
        type: Array,
        default: []
    },
    solved: {
        type: Array,
        default: []
    }
}, { collection: "userstats" });
module.exports = mongoose.model("userstats", userStatsSchema);