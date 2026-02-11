export default function SummaryCard({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) {
  return (
    <div
      className="group bg-gradient-to-br from-white to-gray-50 
                 border border-gray-200 rounded-2xl p-2 
                 hover:shadow-2xl transition-all duration-300 
                 hover:-translate-y-1 relative cursor-pointer"
      onClick={onSelect}
    >
      {/* Header */}
      <div
        className="rounded-xl p-4 relative 
                   bg-gradient-to-br from-indigo-50 via-white to-pink-50"
      >
        <div className="flex items-start">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-12 h-12 
                       bg-white/80 backdrop-blur 
                       rounded-xl flex items-center justify-center mr-4 
                       shadow-md ring-1 ring-gray-200"
          >
            <span className="text-lg font-bold text-indigo-600">
                {role
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
            </span>
          </div>

          {/* Content */}
          <div className="flex-grow">
            <h2 className="text-[18px] font-bold text-gray-900 tracking-tight">
              {role}
            </h2>

            {/* Topics pill */}
            <p
              className="inline-block mt-1 text-[11px] font-semibold 
                         text-indigo-700 bg-indigo-100/70 
                         px-2.5 py-1 rounded-full"
            >
              {topicsToFocus}
            </p>
          </div>
        </div>

        {/* Delete Button (hover) */}
        <button
          className="hidden group-hover:flex items-center gap-2 
                     text-xs text-rose-600 font-semibold 
                     bg-rose-50 px-3 py-1.5 rounded-lg 
                     border border-rose-200 
                     hover:bg-rose-100 hover:border-rose-300 
                     transition-all duration-200 cursor-pointer 
                     absolute top-3 right-3 shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          🗑 Delete
        </button>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div
            className="text-[10px] font-semibold 
                       text-indigo-700 px-3 py-1 
                       bg-indigo-50 border border-indigo-100 
                       rounded-full"
          >
            Exp: {experience}
          </div>

          <div
            className="text-[10px] font-semibold 
                       text-emerald-700 px-3 py-1 
                       bg-emerald-50 border border-emerald-100 
                       rounded-full"
          >
            {questions} Q&A
          </div>

          <div
            className="text-[10px] font-semibold 
                       text-amber-700 px-3 py-1 
                       bg-amber-50 border border-amber-100 
                       rounded-full"
          >
            Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[12px] text-gray-600 font-medium 
                     line-clamp-2 mt-3 leading-relaxed"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
