import { useParams } from "react-router-dom";
import moment from "moment"
import {AnimatePresence,motion} from "framer-motion";
import {LuCircleAlert,LuListCollapse} from "react-icons/lu"
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
export default function InterviewPrep(){
    const {sessionId} =useParams();
    const [sessionData,setSessionData]=useState(null);
    const [errorMsg,setErrorMsg]=useState("");
    const [openLearnMoreDrawer,setOpenLearnDrawer]=useState(false);
    const [explanation,setExplanation]=useState(null);

    const [isLoading,setIsLoading]=useState(false);
    const [iUpdateLoader,setIsUpdateLoader]=useState(false);

    //fetch session data by session id
    const fetchSessionDetailsById=async ()=>{}

    //Generate concept explanation
    const generateConceptExplanation=async(question)=>{};
    //pin question
    const toggleQuestionPinStatus=async(questionId)=>{};

    //Add more questions to session
    const uploadMoreQuestions=async()=>{};
    useEffect(() => {
  if (sessionId) {
    fetchSessionDetailsById();
  }
}, [sessionId]);

return (
  <DashboardLayout>
    { (
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || []}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || 0}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
    )}
  </DashboardLayout>
);


    
}