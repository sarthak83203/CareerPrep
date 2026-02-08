require("dotenv").config();
const express=require("express");
const cors=require("cors");
const path=require("path");
const connectDb = require("./config/db");
const authRoutes = require("./routes/authRoutes.js");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes.js");


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
app.use("/api/auth",authRoutes);

//Serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));


//Starting of server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is Listening to ${PORT}`);
})
//Dtabase call
connectDb();

//Routes

app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);

//ai geneartor
// app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
// app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);




