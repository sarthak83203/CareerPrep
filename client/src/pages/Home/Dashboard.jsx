import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import SummaryCard from "../../components/Cards/SummaryCard";
import { CARD_BG } from "../../utils/data";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/DeleteAlertContent";
import { toast } from "react-hot-toast";


export default function Dashboard() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
     open: false,
      data: null,
    });

   const deleteSession = async (session) => {
  if (!session?._id) return;

  try {
    await axiosInstance.delete(API_PATHS.SESSION.DELETE(session._id));
    setSessions((prev) => prev.filter((s) => s._id !== session._id));
    setOpenDeleteAlert({ open: false, data: null });
    toast.success("Session deleted successfully!");
  } catch (err) {
    console.error("Error deleting the session:", err);
    toast.error("Error deleting the session. Please try again later");
  }
};



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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      
      <div className="container mx-auto px-4 md:px-8 pt-10 pb-28">

        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold 
            bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
            bg-clip-text text-transparent">
            Your Interview Sessions 
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Manage, review, and continue your AI-powered interview prep.
          </p>
        </div>

        {/* Empty State */}
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center 
            text-center mt-24
            border border-dashed border-slate-700
            rounded-2xl p-12
            bg-white/5 backdrop-blur-md
          ">
            <p className="text-lg text-slate-300 font-medium">
              No sessions yet 
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Click “Add New” to create your first interview session
            </p>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((data, index) => (
            <div
              key={data._id}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <SummaryCard
                colors={CARD_BG[index % CARD_BG.length]}
                role={data.role}
                topicsToFocus={data.topicsToFocus}
                experience={data.experience}
                questions={data.questions?.length || 0}
                description={data.description}
                lastUpdated={moment(data.updatedAt).format("Do MMM YYYY")}
                onSelect={() =>
                  navigate(`/interview-prep/${data._id}`)
                }
                onDelete={() =>
                  setOpenDeleteAlert({ open: true, data })
                }
              />
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setOpenCreateModal(true)}
          className="
            fixed bottom-8 right-8
            flex items-center gap-3
            px-6 py-3 rounded-full
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-white font-medium
            shadow-[0_10px_30px_rgba(99,102,241,0.5)]
            transition-all duration-300
            hover:scale-110
            hover:shadow-[0_15px_40px_rgba(139,92,246,0.6)]
            active:scale-95
          "
        >
          <LuPlus className="text-xl" />
          <span className="hidden md:inline">Add New</span>
        </button>

      </div>

      {/* Create Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <CreateSessionForm />
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() =>
          setOpenDeleteAlert({ open: false, data: null })
        }
        title="Delete Alert"
      >
        <div className="w-full md:w-[400px]">
          <DeleteAlertContent
            content="Are you sure you want to delete the session details?"
            onDelete={() =>
              deleteSession(openDeleteAlert.data)
            }
          />
        </div>
      </Modal>

    </div>
  </DashboardLayout>
);

}
