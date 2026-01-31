import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data.js";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import Modal from "../components/Modal";

import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";

export default function LandingPage() {
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    // Example: navigate to a signup page or start
    setOpenAuthModal(true);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full bg-slate-950 overflow-hidden">
        {/* Background blur circles */}
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

        {/* Container */}
        <div className="relative container mx-auto px-6 py-16">
          {/* Header */}
          <header className="flex items-center justify-between mb-16">
            <div className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition">
              CareerPrep
            </div>

            <button
              className="group px-6 py-2 text-sm text-white rounded-lg bg-white/10 hover:bg-indigo-500/20 hover:text-indigo-300 transition active:scale-95 relative"
              onClick={() => setOpenAuthModal(true)}
            >
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 group-hover:ring-white/40 transition" />
              Login / Sign Up
            </button>
          </header>

          {/* Hero content */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-24">
            {/* Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md hover:scale-105 transition">
                <LuSparkles className="animate-pulse" />
                AI Powered
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
                Interview Success Through <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent animate-text-shine">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              <p className="text-base md:text-lg text-slate-300">
                Smart questions, expandable answers, and guided concepts — built
                to boost confidence and performance.
              </p>

              <button
                className="group relative rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm md:text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                onClick={handleCTA}
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-white/10 transition" />
                Get Started
              </button>
            </div>

            {/* Hero Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src={HERO_IMG}
                alt="hero"
                className="w-full max-w-lg rounded-2xl shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:scale-[1.01]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-slate-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-2xl md:text-3xl font-semibold text-white">
            Tools that move you forward
          </h2>

          <div className="flex flex-col gap-12">
            {/* First 3 features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-blue-400/40 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 transition" />
                  <h3 className="relative mb-3 text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Remaining features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-indigo-400/40 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 transition" />
                  <h3 className="relative mb-3 text-base font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="relative text-sm text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 py-5 text-center text-sm text-slate-400">
        Made with love
      </footer>

      {/* AUTH MODAL */}
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
