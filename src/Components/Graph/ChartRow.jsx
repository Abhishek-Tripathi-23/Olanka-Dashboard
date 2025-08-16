import React from 'react';

export default function ChartRow({ date, payments, pipelines, maxValue }) {
  const paymentsWidth = (payments / maxValue) * 100;
  const pipelinesWidth = (pipelines / maxValue) * 100;
  
  // Increase width for larger screens
  const getBarWidth = (percentage) => {
    if (window.innerWidth >= 1536) { // 2xl breakpoint
      return Math.min(percentage * 1.5, 100); // Increase width by 50% but cap at 100%
    }
    return percentage;
  };

  return (
    <div className="flex items-center xl:py-[2.2px] 2xl:py-2">
      {/* Date label */}
      <div className="w-16 xl:max-h-[1000px] 2xl:max-h-[1970px] text-xs text-gray-600 text-left flex-shrink-0 pr-2">
        {date}
      </div>

      {/* Chart area */}
      <div className="flex-1 relative">
        <div className="relative py-[2px] 2xl:py-3.75">
          {/* Payment bar */}
          <div
            className="h-3 xl:h-1.75 2xl:h-4 bg-blue-400 rounded-sm mb-0.5"
            style={{ width: `${getBarWidth(paymentsWidth)}%` }}
          />
          {/* Pipeline bar */}
          <div
            className="h-3 xl:h-1.75 2xl:h-4 bg-black rounded-sm"
            style={{ width: `${getBarWidth(pipelinesWidth)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
