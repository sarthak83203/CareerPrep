import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  // Fetch session data
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
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
      <div className="px-4 md:px-8 py-6">

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
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Interview Q & A
          </h2>

          <div className="grid grid-cols-12 gap-6">
            <div
              className={`col-span-12 transition-all duration-300 ${
                openLearnMoreDrawer
                  ? "md:col-span-7"
                  : "md:col-span-8"
              }`}
            >
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                    className="mb-5"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5">
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => {
                          setExplanation(data.answer);
                          setOpenLearnDrawer(true);
                        }}
                        isPinned={data?.isPinned}
                        onTogglePin={() => {}}

                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Drawer */}
            {openLearnMoreDrawer && (
              <div className="col-span-12 md:col-span-5">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Concept Explanation
                  </h3>

                  <div className="text-sm text-gray-600 leading-relaxed">
                    {explanation}
                  </div>

                  <button
                    onClick={() => setOpenLearnDrawer(false)}
                    className="mt-4 text-sm text-blue-600 hover:underline"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
