import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";

import { BsPinAngleFill } from "react-icons/bs";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";


export default function InterviewPrep() {
  const { sessionId } = useParams();
  const[isLoading,setIsLoading]=useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const [sessionData, setSessionData] = useState(null);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  //more questions
const uploadMoreQuestions = async () => {
  try {
    setIsUpdateLoader(true);
    setErrorMsg("");

   const aiResponse = await axiosInstance.post(
  API_PATHS.AI.GENERATE_QUESTIONS,
  {
    sessionId,  
    role: sessionData?.role,
    experience: sessionData?.experience,
    topicsToFocus: sessionData?.topicsToFocus,
    numberOfQuestions: 10,
  }
);


    const generatedQuestions =
      aiResponse.data.questions || aiResponse.data;

    if (!Array.isArray(generatedQuestions)) {
      throw new Error("AI did not return an array");
    }

    
   

    await fetchSessionDetailsById();

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    setErrorMsg("Failed to load more questions.");
  } finally {
    setIsUpdateLoader(false);
  }
};




  //Concept Explanation

  const generateConceptExplanation = async (question) => {
  try {
    setErrorMsg("");
    setExplanation(null);
    setIsLoading(true);
    setOpenLearnMoreDrawer(true);

    const response = await axiosInstance.post(
      API_PATHS.AI.GENERATE_EXPLANATION,
      { question }
    );

    if (response.data) {
      setExplanation(response.data);
    }
  } catch (error) {
    setExplanation(null);
    setErrorMsg("Failed to generate explanation. Try again later.");
  } finally {
    setIsLoading(false);
  }
};


  // Toggle Pin
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );

      if (response.data?.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  //  Fetch session
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data?.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <div className="px-4 md:px-10 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

        {/* Header */}
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

        {/* Q&A Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
            Interview Q & A
          </h2>

          <div className="grid grid-cols-12 gap-8">

            {/* Questions */}
            <div
              className={`col-span-12 transition-all duration-500 ${
                openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
              }`}
            >
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                    }}
                    className="relative group mb-6"
                  >

                    {/* Floating Pin Button (Visible on Hover Only) */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        toggleQuestionPinStatus(data._id)
                      }
                      className={`absolute -top-3 -right-3 z-20 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100
                        ${
                          data?.isPinned
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-600 hover:bg-blue-100"
                        }
                      `}
                    >
                      {data?.isPinned ? (
                        <BsPinAngleFill size={18} />
                      ) : (
                       <FiMapPin size={18} />
                      )}
                    </motion.button>

                    {/* Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">

                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => {
                         generateConceptExplanation(data.question);
                          }}

                        isPinned={data?.isPinned}
                        onTogglePin={() =>
                          toggleQuestionPinStatus(data._id)
                        }
                      />

                    </div>
                    {!isLoading &&
                         sessionData?.questions?.length==index+1 && (
                          <div className="flex items-center justify-center mt-5">
                            <button className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer" disabled={isLoading || isUpdateLoader} onClick={uploadMoreQuestions}>
                              {isUpdateLoader ?(
                                <SpinnerLoader/>
                              ):(
                                <LuListCollapse className="text-lg"/>
                              )}{" "}
                              Load More
                            </button>
                          </div>
                         )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/*  Animated Drawer */}
            

          </div>
        </div>
      <Drawer
         isOpen={openLearnMoreDrawer}
        onClose={() => setOpenLearnMoreDrawer(false)}
          title="Concept Explanation"
        >
        {errorMsg && (
         <p className="flex gap-2 text-sm text-amber-600 font-medium">
          <LuCircleAlert className="mt-1" />
          {errorMsg}
        </p>
      )}

  {isLoading && <SkeletonLoader />}

  {!isLoading && explanation && (
    <AIResponsePreview content={explanation?.explanation || explanation} />
  )}
</Drawer>

      </div>
    </DashboardLayout>
  );
}
