const mongoose=require("mongoose");
const connectDb=async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DataBase Connected Successfully");

    }).catch((err)=>{
        console.log("Something Error is coming....");
    })
}
module.exports=connectDb;