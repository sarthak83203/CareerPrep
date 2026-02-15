import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data.js";
import { useState, useContext } from "react";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/Modal";

import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";
import { UserContext } from "../context/userContext.jsx";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx";

export default function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen w-full bg-black overflow-hidden flex items-center">

        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-blue-900 opacity-80" />
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-purple-600/30 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-blue-600/30 rounded-full blur-[200px] animate-pulse" />

        <div className="relative container mx-auto px-6 py-20">

          {/* HEADER */}
          <header className="flex justify-between items-center mb-24">
            <div className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CareerPrep
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="px-6 py-2 rounded-2xl text-white 
                bg-white/10 backdrop-blur-xl border border-white/20
                hover:bg-indigo-500/20 hover:border-indigo-400
                transition-all duration-300 hover:scale-110"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* HERO CONTENT */}
          <div className="flex flex-col md:flex-row items-center gap-20">

            {/* LEFT */}
            <div className="md:w-1/2 space-y-8">

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-sm text-white border border-white/20 hover:scale-110 transition">
                <LuSparkles className="text-yellow-400 animate-spin" />
                AI Powered Career Platform
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">
                Crack Interviews With{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Intelligent AI
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Transform your preparation with adaptive questions, smart answers,
                and real interview simulations designed to make you unstoppable.
              </p>

              <button
                onClick={handleCTA}
                className="relative overflow-hidden rounded-3xl px-10 py-4 
                text-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                hover:scale-110 transition-all duration-300
                shadow-[0_0_40px_rgba(99,102,241,0.6)]"
              >
                Get Started →
              </button>

            </div>

            {/* RIGHT IMAGE WITH GLOW */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-500 blur-3xl opacity-50 group-hover:opacity-80 transition duration-500 rounded-3xl" />
                <img
                  src={HERO_IMG}
                  alt="hero"
                  className="relative w-full max-w-xl rounded-3xl shadow-2xl transition duration-500 group-hover:scale-105 group-hover:-translate-y-4"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative bg-black py-28 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black opacity-90" />

        <div className="relative container mx-auto px-6">

          <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-20">
            Everything You Need To Succeed
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            {APP_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="relative group p-8 rounded-3xl
                bg-white/5 backdrop-blur-2xl border border-white/10
                hover:-translate-y-6 transition-all duration-500
                hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-500/10 to-blue-500/10 transition duration-500" />

                <h3 className="relative text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                <p className="relative text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black py-6 text-center text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} CareerPrep. Designed to help you win.
      </footer>

      {/* ================= AUTH MODAL ================= */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" ? (
          <Login setCurrentPage={setCurrentPage} />
        ) : (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Modal>
    </>
  );
}
