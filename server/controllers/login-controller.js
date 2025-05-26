const loginDetails=require("../model/login");

const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await loginDetails.findOne({username:String(username)});
        if(!user){
            return res.status(401).json({message:"Invalid username"});
        }
        if(user.password!==String(password)){
            return res.status(401).json({message:"Invalid password"});
        }
        return res.status(200).json({message:"Login successful"});
    }catch(error){
        return res.status(500).json({message:error});
    }
}

module.exports=login;