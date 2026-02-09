import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo / Title */}
        <Link to="/dashboard" className="group flex items-center gap-2">
          <LuSparkles className="text-indigo-400 group-hover:rotate-12 transition" />
          <h2 className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Preparation Using AI
          </h2>
        </Link>

        {/* Profile */}
        <ProfileInfoCard />
      </div>
    </header>
  );
}
