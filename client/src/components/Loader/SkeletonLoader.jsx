import React from "react";

const SkeletonLine = ({ width = "w-full", height = "h-3" }) => (
  <div
    className={`${height} ${width} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-md animate-pulse`}
  />
);

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-5 border border-gray-100 dark:border-gray-700">
      {/* Title */}
      <SkeletonLine width="w-1/3" height="h-6" />

      {/* Paragraph */}
      <div className="space-y-3">
        <SkeletonLine />
        <SkeletonLine width="w-11/12" />
        <SkeletonLine width="w-10/12" />
        <SkeletonLine width="w-8/12" />
      </div>

      {/* Code Block Style */}
      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl space-y-2">
        <SkeletonLine width="w-3/4" height="h-2.5" />
        <SkeletonLine width="w-2/3" height="h-2.5" />
        <SkeletonLine width="w-1/2" height="h-2.5" />
      </div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-pulse">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default SkeletonLoader;
