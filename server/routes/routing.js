const login=require("../controllers/login-controller");
const signup=require("../controllers/signup-controller");
const {addChats, getChats}=require('../controllers/chats-controller');
const {getProblems,getOneProblem}=require('../controllers/problems-controller');
const {getUserStats,updateUserStats}=require('../controllers/userstats-controller');

const express=require("express");
const router=express.Router();

router.get("/problems",getProblems);
router.get("/problems/:id",getOneProblem);

router.get("/rooms",getChats);
router.post("/rooms",addChats);

router.post("/signup",signup);

router.post("/login",login);

router.get("/userstats",getUserStats);
router.patch("/userstats",updateUserStats);

module.exports=router;