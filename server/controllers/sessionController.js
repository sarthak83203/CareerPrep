const Session=require("../models/Session");
const Question=require("../models/Question");

//Creating a new Session ...
const createSession=async(req,res)=>{
    try{
        const {role,experience,topicsToFocus,description,questions}=req.body;
        const userId=req.user._id;
     //putting this in Database.....
        const session=await Session.create({
            user:userId,
            role,
            experience,
            topicsToFocus,
            description,
        });
        const questionDocs=await Promise.all(
            questions.map(async(q)=>{
                const question=await Question.create({
                    session:session._id,
                    question:q.question, 
                    answer:q.answer,
                })
                return question._id; 
            })
        );

        session.questions=questionDocs;  //putting questionDocs in question .....
        await session.save();

       res.status(201).json({
        success:true,
        session,           //returing session...
       })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })

    }
}

//Get all the session for login user....
//Get/api/session/my-session
const getMySessions=async (req,res)=>{
    try{
        const sessions=await Session.find({user:req.user._id})
        .sort({createdAt:-1})
        .populate("questions");   //replace id's with actual document....
        res.status(200).json(sessions);

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }

}

//get the session by id with populated questions..
const getSessionById =async(req,res)=>{

}

//delete a session and its questions....
const deleteSession=async(req,res)=>{


}

module.exports={createSession,getSessionById,getMySessions,deleteSession};


