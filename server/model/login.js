const mongoose = require("mongoose");

const profileSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: "profiles"});

module.exports = mongoose.model("login", profileSchema);