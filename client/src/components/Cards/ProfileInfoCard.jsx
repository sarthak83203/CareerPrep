import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/");
  };

  return user && (
    <div className="relative">
      {/* PROFILE BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 cursor-pointer rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:ring-indigo-400/40 hover:shadow-indigo-500/20"
      >
        {/* Avatar / Photo */}
        <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover:ring-indigo-400/60 transition">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-sm font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Hover shine */}
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition" />
        </div>

        {/* Name */}
        <p className="text-sm font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent whitespace-nowrap">
          {user?.name}
        </p>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-40 rounded-xl bg-slate-900/90 backdrop-blur-xl ring-1 ring-white/20 shadow-2xl animate-fade-in z-50">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
