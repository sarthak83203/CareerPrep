export default function RoleInfoHeader({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-200">
      
      {/* Top Section */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {role}
          </h2>

          <p className="text-sm text-gray-500">
            {Array.isArray(topicsToFocus)
              ? topicsToFocus.join(", ")
              : topicsToFocus}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            Last Updated
          </p>
          <p className="text-sm font-medium text-gray-700">
            {lastUpdated || "-"}
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Bottom Stats Section */}
      <div className="flex gap-6 flex-wrap">
        
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Experience</p>
          <p className="text-sm font-semibold text-blue-700">
            {experience || "-"}
          </p>
        </div>

        <div className="bg-green-50 px-4 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Questions</p>
          <p className="text-sm font-semibold text-green-700">
            {questions} Q&A
          </p>
        </div>

      </div>

      {/* Description (Optional) */}
      {description && (
        <div className="mt-4 text-gray-600 text-sm">
          {description}
        </div>
      )}

    </div>
  );
}
