import React from "react";

interface ProgressBarProps {
  percentage: number; // Accepts a percentage value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="my-9 relative">
      {/* Outer Progress Bar Container */}
      <div className="w-full h-[19px] bg-transparent justify-center items-center rounded-full border-2 border-[#003ace9f]">
        {/* Inner Bar */}
        <div
          className="bg-[#003acec2] h-[16px] rounded-full border-2 border-white ml-1"
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
