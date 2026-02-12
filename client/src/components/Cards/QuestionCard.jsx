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
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 mb-4 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        {/* Question Section */}
        <div className="flex items-center gap-3">
          <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-sm">
            Q
          </span>
          <h3
            className="text-gray-800 font-semibold cursor-pointer hover:text-blue-600 transition-colors duration-200"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div
            className={`flex gap-2 items-center transition-all duration-300 ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff size={22} /> : <LuPin size={22} />}
            </button>

            <button
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles size={18} />
              <span>Learn More</span>
            </button>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Answer Section */}
      <div
        className="overflow-hidden transition-all duration-300 mt-3 text-gray-700"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef} className="p-2">
          <AIResponsePreview content={answer}/>
        </div>
      </div>
    </div>
  );
}
