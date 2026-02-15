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

  return (
    user && (
      <div className="relative">
        
        {/* PROFILE BUTTON */}
        <div
          onClick={() => setOpen(!open)}
          className="group relative flex items-center gap-3 cursor-pointer 
          px-5 py-2.5 rounded-3xl
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          shadow-[0_0_30px_rgba(99,102,241,0.25)]
          transition-all duration-500
          hover:scale-110 hover:border-indigo-400/40
          hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
        >
          
          {/* Neon Glow Background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500" />

          {/* Avatar */}
          <div className="relative h-11 w-11 rounded-full overflow-hidden 
          ring-2 ring-white/20 
          group-hover:ring-indigo-400/70
          transition-all duration-500">

            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="profile"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full 
              bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500
              flex items-center justify-center 
              text-base font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Shine Effect */}
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition duration-500" />
          </div>

          {/* Name */}
          <p className="relative text-sm font-semibold 
          bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 
          bg-clip-text text-transparent whitespace-nowrap tracking-wide">
            {user?.name}
          </p>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div
            className="absolute right-0 mt-4 w-52 rounded-2xl
            bg-black/80 backdrop-blur-2xl
            border border-white/10
            shadow-[0_0_50px_rgba(99,102,241,0.4)]
            animate-[fadeIn_0.3s_ease-in-out]
            overflow-hidden z-50"
          >
            
            {/* Gradient Top Border */}
            <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-5 py-3 text-sm 
              text-red-400 hover:text-white
              transition-all duration-300
              hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20
              group"
            >
              <FiLogOut className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              Logout
            </button>
          </div>
        )}
      </div>
    )
  );
}
