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
    try{
        const session=await Session.findById(req.params.id)
        .populate({
            path:"questions",
            options:{sort:{isPinned:-1, createdAt:1}},

        })
        .exec();  //when hit execute it runs....

        if(!session){
            return res.status(404).json({success:false,message:"Session Not found"});
        }
        res.status(200).json({success:true,session});


    }
    catch(err){
        res.status(500).json({
            success:false,
            message:"Sever Error",
        })
    }

}

//delete a session and its questions....
const deleteSession=async(req,res)=>{
    try{
        const session=await Session.findById(req.params.id);   //coming from express routes....
    if(!session){
        return res.status(404).json({
            message:"Message not found",
        });
    }

    //check if login user owns this message or not
    if(session.user.toString()!==req.user._id.toString()){
        return res.status(401).json({  
        })

    }
    //First Delete all the question Linked to this session..
    await Question.deleteMany({session:session._id});

    //delete the session
    await session.deleteOne();
    res.status(200).json({
        message:"Session Deleted",
    })
        
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Server Error",
        })
    }
    



}

module.exports={createSession,getSessionById,getMySessions,deleteSession};


