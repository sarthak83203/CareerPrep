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

export default function InterviewPrep() {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [openLearnMoreDrawer, setOpenLearnDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

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
                          setExplanation(data.answer);
                          setOpenLearnDrawer(true);
                        }}
                        isPinned={data?.isPinned}
                        onTogglePin={() =>
                          toggleQuestionPinStatus(data._id)
                        }
                      />

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/*  Animated Drawer */}
            <AnimatePresence>
              {openLearnMoreDrawer && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-12 md:col-span-5"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 sticky top-6">

                    <h3 className="text-xl font-bold text-gray-800 mb-5">
                      Concept Explanation
                    </h3>

                    <div className="text-sm text-gray-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                      {explanation}
                    </div>

                    <button
                      onClick={() => setOpenLearnDrawer(false)}
                      className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Close
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
