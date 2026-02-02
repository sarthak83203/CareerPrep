const jwt=require("jsonwebtoken");
const User=require("../models/User");
//Middleware to protect routes

const protect=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(token && token.startsWith("Bearer")){
            token=token.split(" ")[1]; //Extract Token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //attach user to request
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }else{
            res.status(401).json({message:"Not authorized,no token"});
        }
    }catch(err){
        res.status(401).json({
            message:"Error",
        })

    }
}
module.exports={protect};

