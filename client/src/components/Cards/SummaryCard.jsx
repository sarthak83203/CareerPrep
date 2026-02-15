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
      onClick={onSelect}
      className="relative group cursor-pointer mb-6"
    >
      {/* Animated Gradient Border */}
      <div className="absolute -inset-[1px] rounded-3xl blur-xl opacity-40 
                      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                      group-hover:opacity-70 transition duration-700" />

      {/* Main Card */}
      <div
        className="relative rounded-3xl p-6 
                   bg-gradient-to-br from-[#0f172a] to-[#0b1120] 
                   border border-white/10 
                   backdrop-blur-2xl
                   transition-all duration-500
                   hover:-translate-y-3 hover:scale-[1.02]
                   shadow-[0_0_40px_rgba(99,102,241,0.25)]
                   hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]"
      >
        {/* Shimmer Hover Effect */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 
                          bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          skew-x-[-20deg] 
                          opacity-0 group-hover:opacity-100
                          group-hover:animate-[shine_1.2s_ease-in-out]" />
        </div>

        {/* HEADER */}
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-start gap-4">

            {/* Role Avatar */}
            <div
              className="flex-shrink-0 w-14 h-14 rounded-2xl 
                         bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
                         flex items-center justify-center
                         text-white font-bold text-lg
                         shadow-lg transition duration-500
                         group-hover:scale-110"
            >
              {role
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            {/* Role Info */}
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {role}
              </h2>

              <p className="mt-1 text-xs font-semibold 
                            text-indigo-300 
                            bg-indigo-500/10 
                            px-3 py-1 rounded-full inline-block">
                {topicsToFocus?.join(" • ")}
              </p>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="opacity-0 group-hover:opacity-100 
                       transition-all duration-300
                       text-xs font-semibold
                       text-rose-400 
                       bg-rose-500/10 
                       px-3 py-1.5 rounded-xl
                       border border-rose-500/20
                       hover:bg-rose-500/20
                       hover:scale-105"
          >
            🗑 Delete
          </button>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-3 mt-6 relative z-10">
          <span className="text-xs font-semibold 
                           text-blue-300 
                           bg-blue-500/10 
                           px-3 py-1.5 rounded-full border border-blue-500/20">
             Exp: {experience}
          </span>

          <span className="text-xs font-semibold 
                           text-emerald-300 
                           bg-emerald-500/10 
                           px-3 py-1.5 rounded-full border border-emerald-500/20">
             {questions} Q&A
          </span>

          <span className="text-xs font-semibold 
                           text-amber-300 
                           bg-amber-500/10 
                           px-3 py-1.5 rounded-full border border-amber-500/20">
             {lastUpdated}
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 text-sm text-gray-300 leading-relaxed line-clamp-2 relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}
