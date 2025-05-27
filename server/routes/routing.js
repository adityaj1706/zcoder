const login=require("../controllers/login-controller");
const signup=require("../controllers/signup-controller");
const {addChats, getChats}=require('../controllers/chats-controller');
const express=require("express");
const router=express.Router();

router.get("/api/rooms",getChats);
router.post("/api/rooms",addChats);
router.post("/api/signup",signup);
router.post("/api/login",login);
module.exports=router;