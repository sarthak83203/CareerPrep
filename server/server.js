require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDb = require("./config/db");

const app=express();

//Middle ware that haddles cores

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
        
    })
);

//Middleware
app.use(express.json()); //parsing the message..
 

//Routes


//Serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));


//Starting of server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is Listening to ${PORT}`);
})
//Dtabase call
connectDb();

app.get("/",(req,res)=>{
    res.send("Yes Succesfully running");
    
})


