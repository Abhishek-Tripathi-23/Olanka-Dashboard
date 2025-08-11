import React from 'react'
import ChartRow from "./ChartRow"

export default function ChartGrid({ data }) {
  return (
    <div className="relative ">
      {/* Vertical axis line - separates dates from chart area */}
      <div className="absolute left-16 top-0 bottom-0 w-px bg-gray-400 z-10" />

      {/* Continuous vertical grid lines */}
      <div className="absolute inset-0 ml-16 flex">
        {[1, 2, 3, 4, 5].map((line) => (
          <div key={line} className="flex-1 border-r border-gray-300 last:border-r-0" />
        ))}
      </div>

      {/* Chart rows */}
      <div className="relative space-y-1">
        {data.map((item, index) => (
          <ChartRow
            key={index}
            date={item.date}
            payments={item.payments}
            pipelines={item.pipelines}
            maxValue={5}
          />
        ))}
      </div>

      {/* Horizontal axis line for x-axis */}
      <div className="ml-16 h-px bg-gray-400 mt-3" />

      {/* X-axis labels positioned at grid intersections */}
      <div className="flex ml-16 text-sm text-gray-600 relative">
        {[0, 1, 2, 3, 4].map((num) => (
          <div key={num} className="flex-1 relative">
            <span className="absolute left-0 top-1 text-xs">{num}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
