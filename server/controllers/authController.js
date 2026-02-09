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
           return res.status(400).json({
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
        res.status(201).json({  //will taken by frontend
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
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});    //It will give all the data like name etc and etc
        //user
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        //comparing password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
           return res.status(401).json({
                message:"Please enter a correct password",
            })
        }

        //Now return userdata with JWT
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        })




    }catch(err){
        res.status(500).json({
            message:"Server Error",
        })

    }

    



}
//getprofile

const getUserProfile=async (req,res)=>{
    try{

    const user = await User.findById(req.user._id).select("-password");
    if(!user){
        return res.status(404).json({
            message:"User not found",
        })
    }
    res.json(user);
    } catch(err){
    res.status(500).json({
        message:"Error",

    })
}


}

module.exports={registerUser,loginUser,getUserProfile};
