import React from "react";

interface ProgressBarProps {
  percentage: number; // Accepts a percentage value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="my-9 relative w-full">
    {/* Outer Progress Bar Container */}
    <div className="w-full h-5 bg-gray-200 rounded-full border border-blue-300 overflow-hidden">
      {/* Inner Progress Bar */}
      <div
        className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    {/* Percentage Text */}
    <p
      className="text-xs sm:text-sm absolute top-6 left-12 transform -translate-x-1/2 translate-y-1/2 text-blue-700 font-medium"
      // style={{ left: `${percentage}%` }}
    >
      {percentage}% completed
    </p>
  </div>
  );
};

export default ProgressBar;
