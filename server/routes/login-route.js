const login=require("../controllers/login-controller");
const signup=require("../controllers/signup-controller");
const express=require("express");
const router=express.Router();


router.post("/signup",signup);
router.post("/login",login);
module.exports=router;