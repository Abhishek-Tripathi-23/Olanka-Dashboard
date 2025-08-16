import React from "react"
import { styles } from "../styles/communicationStyles"

const StatisticCellFinance = React.memo(({ data, columnKey, indicators, followUpActive, heActive, inquiriesActive, engagingActive, pipelineActive, paidActive, isLast = false }) => {
  const hasIndicator = indicators[columnKey]

  // Check if this column should show indicators
  const shouldShowIndicators = (columnKey === "followUp" && followUpActive) || (columnKey === "he" && heActive) || (columnKey === "paid" && paidActive)

  // Helper function to check if a column is active
  const isColumnActive = (columnKey) => {
    switch (columnKey) {
      case "followUp":
        return followUpActive
      case "he":
        return heActive
      case "inquiries":
        return inquiriesActive
      case "engaging":
        return engagingActive
      case "pipeline":
        return pipelineActive
      case "paid":
        return paidActive
      case "paid2":
        return true // Always show paid2 column
      default:
        return true
    }
  }

  // Get background color class based on column
  const getBackgroundColor = () => {
    if (columnKey === "paid") return "bg-gray-200"
    return columnKey === "engaging" ? "bg-green-100" : " bg-blue-100"
  }

  // Special handling for paid2 column (shows dollar amount)
  if (columnKey === "paid2") {
    return (
      <td className={`w-16 2xl:h-36 ${isLast ? " relative text-xs sm:text-sm lg:text-base h-12" : "border-r border-gray-300 relative text-xs sm:text-sm lg:text-base h-12"}`}>
        <div className="h-full flex justify-center items-center">
          <span className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-3xl">{data}</span>
        </div>
      </td>
    )
  }

  // For any column, if not active, show empty cell
  if (!isColumnActive(columnKey)) {
    return (
      <td className={`w-16 2xl:w-96 2xl:h-36 ${isLast ? "p-1 sm:p-2 relative text-xs sm:text-sm lg:text-base h-full" : "border-r border-gray-400 relative text-xs sm:text-sm lg:text-base xl:h-12 2xl:h-full"} ${columnKey === "paid" ? "bg-[#EAEAEA] border-t border-b border-l border-gray-400" : ""}`}>
        <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base h-full">
          <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center"></div>
          <div className="text-center font-semibold text-xs sm:text-sm lg:text-base  h-full flex justify-center items-center"></div>
          <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full  flex justify-center items-center"></div>
          <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base  h-full  flex justify-center items-center"></div>
        </div>
      </td>
    )
  }

  // Handle array data for regular columns
  const [primary, secondary] = Array.isArray(data) ? data : [0, 0]

  return (
    <td className={`w-16  2xl:w-96 2xl:h-36 ${isLast ? " relative text-xs sm:text-sm lg:text-base h-12  2xl:h-full" : "border-r border-gray-400 relative text-xs sm:text-sm lg:text-base sm:h-8 xl:h-full 2xl:h-12 "} ${columnKey === "paid" ? "bg-[#EAEAEA] border-t border-b border-l border-gray-400" : ""}`}>
      <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base xl:h-13 2xl:h-full h-full  xl:w-16 2xl:w-full">
        {shouldShowIndicators ? (
          <>
            {/* Top-left indicator */}
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
              {indicators[columnKey] && (
                <span className={`${columnKey === "he" ? "bg-blue-500 xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl" : columnKey === "paid" ? "bg-green-500 xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl" : "bg-black xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl"} text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-5 xl:w-5  rounded-full flex items-center justify-center text-sm xl:text-xs font-bold`}>
                  {indicators[columnKey]}
                </span>
              )}
            </div>
            {/* Top-right (empty for followUp, he, and paid) */}
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base  h-full flex justify-center items-center">
            </div>
            {/* Bottom-left (empty for followUp, he, and paid) */}
            <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full  flex justify-center items-center">
            </div>
            {/* Bottom-right indicator */}
            <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base  h-full  flex justify-center items-center relative">
              {columnKey === "followUp" && indicators.he && (
                <span className="bg-black text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-sm  font-bold">
                  {indicators.he}
                </span>
              )}
              {columnKey === "he" && indicators.followUp && (
                <span className="bg-blue-500 text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-sm font-bold">
                  {indicators.followUp}
                </span>
              )}
              {columnKey === "paid" && indicators.paid && (
                <span className="bg-green-500 text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-5 xl:w-5 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center font-bold">
                  {indicators.paid}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full flex justify-center items-center">{primary}</div>
            <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl ${getBackgroundColor()} h-full flex justify-center items-center`}>{secondary}</div>
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">{primary + 10}</div>
            <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl ${getBackgroundColor()} h-full border-t border-t-gray-300 flex justify-center items-center`}>{secondary + 8}</div>
          </>
        )}
      </div>
    </td>
  )
})

StatisticCellFinance.displayName = "StatisticCellFinance"

export default StatisticCellFinance
