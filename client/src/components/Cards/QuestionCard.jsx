import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

export default function QuestionCard({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative group mb-8">

      {/* Animated Gradient Border */}
      <div
        className={`absolute -inset-[1px] rounded-[28px] blur-xl opacity-40 
        transition duration-700 
        ${isPinned 
          ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 opacity-70" 
          : "bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 group-hover:opacity-70"
        }`}
      />

      {/* Main Card */}
      <div
        className={`relative rounded-[28px] p-7 
        bg-gradient-to-br from-[#0f172a] to-[#0b1120]
        border border-white/10 
        backdrop-blur-2xl
        transition-all duration-500
        hover:-translate-y-3 hover:scale-[1.01]
        ${isPinned ? "shadow-[0_0_50px_rgba(255,180,0,0.5)]" : "shadow-[0_0_40px_rgba(99,102,241,0.3)]"}
        `}
      >

        {/* Shimmer Overlay */}
        <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 
          bg-gradient-to-r from-transparent via-white/10 to-transparent 
          skew-x-[-20deg] 
          opacity-0 group-hover:opacity-100
          group-hover:animate-[shine_1.2s_ease-in-out]" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start relative z-10">

          {/* Left Section */}
          <div className="flex items-start gap-4">

            {/* Q Badge */}
            <div
              className={`h-10 w-10 flex items-center justify-center 
              rounded-full text-sm font-bold text-white
              bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500
              shadow-lg transition duration-500
              ${isPinned ? "ring-2 ring-yellow-400 shadow-yellow-400/40" : ""}
              `}
            >
              Q
            </div>

            <h3
              onClick={toggleExpand}
              className="text-white text-lg md:text-xl font-semibold cursor-pointer
              transition duration-300 
              group-hover:text-indigo-300"
            >
              {question}
            </h3>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">

            <div
              className={`flex gap-3 items-center transition-all duration-500 ${
                isExpanded ? "flex opacity-100" : "hidden md:flex opacity-0 group-hover:opacity-100"
              }`}
            >
              {/* Pin Button */}
              <button
                onClick={onTogglePin}
                className={`p-2 rounded-xl transition-all duration-300
                ${isPinned
                  ? "text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20"
                  : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"}
                `}
              >
                {isPinned ? <LuPinOff size={20} /> : <LuPin size={20} />}
              </button>

              {/* Learn More */}
              <button
                onClick={() => {
                  setIsExpanded(true);
                  onLearnMore();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600
                text-white text-sm font-medium
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(99,102,241,0.7)]
                transition-all duration-300"
              >
                <LuSparkles size={16} />
                Learn More
              </button>
            </div>

            {/* Chevron */}
            <button
              onClick={toggleExpand}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition"
            >
              <LuChevronDown
                size={22}
                className={`transition-transform duration-500 ${
                  isExpanded ? "rotate-180 text-indigo-400" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Answer Section */}
        <div
          className="overflow-hidden transition-all duration-700 mt-6"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="p-5 rounded-2xl 
            bg-black/40 
            border border-white/10 
            backdrop-blur-xl 
            text-gray-300"
          >
            <AIResponsePreview content={answer} />
          </div>
        </div>

      </div>
    </div>
  );
}
