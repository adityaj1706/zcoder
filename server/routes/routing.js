const login=require("../controllers/login-controller");
const signup=require("../controllers/signup-controller");
const {addChats, getChats}=require('../controllers/chats-controller');
const {getProblems,getOneProblem}=require('../controllers/problems-controller');
const {getUserStats,updateUserStats}=require('../controllers/userstats-controller');

const express=require("express");
const router=express.Router();

router.get("/api/problems",getProblems);
router.get("/api/problems/:id",getOneProblem);

router.get("/api/rooms",getChats);
router.post("/api/rooms",addChats);

router.post("/api/signup",signup);

router.post("/api/login",login);

router.get("/api/userstats",getUserStats);
router.patch("/api/userstats",updateUserStats);

module.exports=router;