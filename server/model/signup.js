const mongoose = require("mongoose");

const profileSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("profile", profileSchema);