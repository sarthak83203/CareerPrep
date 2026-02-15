import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full group">

      {/* Animated Moving Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[3px] 
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        bg-[length:200%_100%] animate-[gradientMove_4s_linear_infinite]" 
      />

      <div
        className="
        border-b border-white/10
        bg-slate-950/70 backdrop-blur-2xl
        transition-all duration-500
        group-hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)]
        shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      "
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-6">

          {/* Logo Section */}
          <Link
            to="/dashboard"
            className="relative flex items-center gap-3 group/logo"
          >
            {/* Glow Background */}
            <div className="absolute -inset-3 rounded-2xl 
              bg-gradient-to-r from-indigo-500/20 to-purple-500/20 
              blur-2xl opacity-0 
              group-hover/logo:opacity-100 transition duration-500"
            />

            {/* Icon */}
            <div className="
              relative p-2 rounded-xl 
              bg-gradient-to-tr from-indigo-500 to-purple-600
              shadow-lg
              transition-all duration-300
              group-hover/logo:rotate-12
              group-hover/logo:scale-110
            ">
              <LuSparkles className="text-white text-lg animate-pulse" />
            </div>

            {/* Text */}
            <h2
              className="
                relative text-lg md:text-xl font-bold tracking-tight
                bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400
                bg-clip-text text-transparent
                transition-all duration-300
                group-hover/logo:tracking-wide
              "
            >
              Preparation Using AI
              {/* Animated Underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover/logo:w-full" />
            </h2>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="transition-all duration-300 hover:scale-105">
              <ProfileInfoCard />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
