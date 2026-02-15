import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { BsPinAngleFill } from "react-icons/bs";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

export default function InterviewPrep() {
  const { sessionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch session
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
    if (sessionId) fetchSessionDetailsById();
  }, [sessionId]);

  // Load More Questions
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      setErrorMsg("");

      await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        sessionId,
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 10,
      });

      await fetchSessionDetailsById();
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      setErrorMsg("Failed to load more questions.");
    } finally {
      setIsUpdateLoader(false);
    }
  };

  // Generate Explanation
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
      await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
      fetchSessionDetailsById();
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen px-4 md:px-12 py-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

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

        {/* Section Title */}
        <div className="mt-14 mb-10">
          <h2 className="
            text-3xl md:text-4xl font-bold
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent
          ">
            Interview Q & A
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-10">

          {/* Questions Section */}
          <div className={`col-span-12 transition-all duration-500 ${openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>

            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative group mb-8"
                >

                  {/* Pin Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleQuestionPinStatus(data._id)}
                    className={`
                      absolute -top-4 -right-4 z-20
                      p-3 rounded-full backdrop-blur-xl shadow-lg
                      transition-all duration-300
                      opacity-0 group-hover:opacity-100 hover:scale-110
                      ${
                        data?.isPinned
                          ? "bg-indigo-600 text-white shadow-indigo-400/40"
                          : "bg-white/80 text-slate-600 hover:bg-indigo-100"
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
                  <div className="
                    bg-white/90 dark:bg-slate-900/80
                    backdrop-blur-xl
                    border border-slate-200/60 dark:border-slate-700/60
                    rounded-3xl
                    shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)]
                    transition-all duration-500
                    p-7 hover:-translate-y-2
                  ">
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      isPinned={data?.isPinned}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      onTogglePin={() =>
                        toggleQuestionPinStatus(data._id)
                      }
                    />
                  </div>

                  {/* Load More Button */}
                  {!isLoading &&
                    sessionData?.questions?.length === index + 1 && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={uploadMoreQuestions}
                          disabled={isUpdateLoader}
                          className="
                            flex items-center gap-3
                            text-sm font-medium text-white
                            bg-gradient-to-r from-indigo-500 to-purple-600
                            px-6 py-2.5 rounded-full
                            shadow-[0_10px_30px_rgba(99,102,241,0.5)]
                            transition-all duration-300
                            hover:scale-105
                            hover:shadow-[0_15px_40px_rgba(139,92,246,0.6)]
                            active:scale-95
                            disabled:opacity-60 disabled:cursor-not-allowed
                          "
                        >
                          {isUpdateLoader ? (
                            <SpinnerLoader />
                          ) : (
                            <LuListCollapse className="text-lg" />
                          )}
                          Load More
                        </button>
                      </div>
                    )}
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        </div>

        {/* Drawer */}
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
            <AIResponsePreview
              content={explanation?.explanation || explanation}
            />
          )}
        </Drawer>

      </div>
    </DashboardLayout>
  );
}
