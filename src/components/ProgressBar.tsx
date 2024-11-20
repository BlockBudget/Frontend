import React from "react";

interface ProgressBarProps {
  percentage: number; // Accepts a percentage value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="my-9 relative">
      {/* Outer Progress Bar Container */}
      <div className="w-full h-[19px] py-1 bg-transparent justify-center items-center rounded-full border-2 border-gray-700">
        {/* Inner Bar */}
        <div
          className="bg-gray-200 h-[10px] rounded-full border-2 border-white ml-1"
          style={{ width: `${percentage}%` }}
        ></div> 
        {/* Percentage Text */}
        <p
          className="text-sm absolute top-[18px] transform -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        >
          {percentage}% completed
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
