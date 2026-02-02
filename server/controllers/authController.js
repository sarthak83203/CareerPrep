const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//getting the jwt token

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};

//Register new user

const registerUser=async(req,res)=>{
    try{
        const {name,email,password,profileImageUrl}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            res.status(400).json({
                message:"User already exist"
            })
        }
        //Hashpassword
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create new user...
        const user=await User.create({
            name,
            email,password:hashedPassword,
            profileImageUrl,
        })

        //Return user data with JWT
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),

        })
    }catch(err){
        res.status(500).json({
            message:"Server Error",
        })

    }


}

//LOgin of new user..
const loginUser=async (req,res)=>{
    



}
//getprofile

const getUserProfile=async ()=>{


}

module.exports={registerUser,loginUser,getUserProfile};
