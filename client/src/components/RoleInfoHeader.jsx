export default function RoleInfoHeader({
  role = "Unknown Role",
  topicsToFocus = [],
  experience = "Not specified",
  questions = 0,
  description = "",
  lastUpdated,
}) {
  const getFormattedDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] 
                    shadow-[0_0_40px_rgba(139,92,246,0.25)] 
                    rounded-2xl p-6 mb-6 border border-white/10 
                    backdrop-blur-md text-white">

      {/* Top Section */}
      <div className="flex justify-between items-start flex-wrap gap-4">

        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {role}
          </h2>

          <p className="text-sm text-gray-400">
            {Array.isArray(topicsToFocus) && topicsToFocus.length > 0
              ? topicsToFocus.join(", ")
              : "No topics specified"}
          </p>
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="text-sm text-gray-400">
            Last Updated
          </p>
          <p className="text-sm font-medium text-white">
            {getFormattedDate(lastUpdated)}
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-white/10 my-4"></div>

      {/* Stats */}
      <div className="flex gap-6 flex-wrap">

        <div className="bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20">
          <p className="text-xs text-gray-400">Experience</p>
          <p className="text-sm font-semibold text-blue-400">
            {experience}
          </p>
        </div>

        <div className="bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">
          <p className="text-xs text-gray-400">Questions</p>
          <p className="text-sm font-semibold text-green-400">
            {questions} Q&A
          </p>
        </div>

      </div>

      {/* Description */}
      {description && (
        <div className="mt-4 text-gray-300 text-sm leading-relaxed">
          {description}
        </div>
      )}

    </div>
  );
}
