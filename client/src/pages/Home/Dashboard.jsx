import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import { CARD_BG } from "../../utils/data";

export default function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

 const fetchAllSession = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);

    console.log("Sessions response:", res.data);

   
    setSessions(res.data.sessions || res.data);
  } catch (err) {
    console.error("Failed to fetch sessions:", err);
  } finally {
  
    setLoading(false);
  }
};



  useEffect(() => {
    fetchAllSession();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-gray-500">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-24">

        {sessions.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No sessions yet 🚀</p>
            <p className="text-sm mt-2">
              Click “Add New” to create your first interview session
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 md:px-0">
          {sessions.map((data, index) => (
            <SummaryCard
              key={data._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data.role}
              topicsToFocus={data.topicsToFocus}
              experience={data.experience}
              questions={data.questions?.length || 0}
              description={data.description}
              lastUpdated={moment(data.updatedAt).format("Do MMM YYYY")}
              onSelect={() => navigate(`/interview-prep/${data._id}`)}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/create-session")}
          className="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-3 rounded-full
          bg-orange-500 text-white shadow-lg hover:scale-105 transition"
        >
          <LuPlus className="text-xl" />
          <span className="hidden md:inline">Add New</span>
        </button>
      </div>
    </DashboardLayout>
  );
}
