import React from "react"
import { styles } from "../styles/communicationStyles"

const StatisticCell = React.memo(({ data, columnKey, indicators, pkgSendsActive, newActive, callsActive, whatsappActive, emailActive, isLast = false }) => {
  const [primary, secondary] = data
  const hasIndicator = indicators[columnKey]

  const getIndicatorPosition = (key, isSecondary = false) => {
    if (key === "pkgSends" || key === "whatsapp") {
      return isSecondary ? "bottom-1 right-1" : "top-1 right-1"
    }
    return "top-1 right-1"
  }

  const getIndicatorColor = (key) => {
    return key === "new" || key === "email" ? "absolute w-4 h-4 sm:w-5 sm:h-5 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold" : "absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
  }

  // Check if this column should show indicators
  const shouldShowIndicators = (columnKey === "pkgSends" && pkgSendsActive) || (columnKey === "new" && newActive)

  // Helper function to check if a column is active
  const isColumnActive = (columnKey) => {
    switch (columnKey) {
      case "pkgSends":
        return pkgSendsActive
      case "new":
        return newActive
      case "calls":
        return callsActive
      case "whatsapp":
        return whatsappActive
      case "email":
        return emailActive
      default:
        return true
    }
  }

  // Get background color class based on column
  const getBackgroundColor = () => {
    return columnKey === "whatsapp" ? "bg-blue-100" : "bg-green-100"
  }

  // For any column, if not active, show empty cell
  if (!isColumnActive(columnKey)) {
    return (
      <td className={`w-16 2xl:w-96 2xl:h-36 ${isLast ? "p-1 sm:p-2 lg:p-0 xl:p-0  relative text-xs sm:text-sm lg:text-base" : "border-r border-gray-200 relative text-xs sm:text-sm lg:text-base h-full"}`}>
        <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base h-full">
          <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center"></div>
          <div className="text-center font-semibold text-xs sm:text-sm lg:text-base  h-full flex justify-center items-center"></div>
          <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full  flex justify-center items-center"></div>
          <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base  h-full  flex justify-center items-center"></div>
        </div>
      </td>
    )
  }

  return (
    <td className={`w-16 2xl:w-96 2xl:h-36 5xl:w-[400px] 5xl:h-48 ${isLast ? " relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 5xl:text-3xl h-12" : "border-r border-gray-200 relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 5xl:text-3xl h-12"}`}>
      <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 5xl:text-3xl h-full">
        {shouldShowIndicators ? (
          <>
            {/* Top-left indicator */}
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
              {indicators[columnKey] && (
                <span className={`${columnKey === "new" ? "bg-black" : "bg-blue-500"} text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 5xl:h-24 5xl:w-24 rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg 2xl:text-4xl 5xl:text-6xl font-bold`}>
                  {indicators[columnKey]}
                </span>
              )}
            </div>
            {/* Top-right (empty for both pkgSends and new) */}
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base  h-full flex justify-center items-center">
            </div>
            {/* Bottom-left (empty for both pkgSends and new) */}
            <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full  flex justify-center items-center">
            </div>
            {/* Bottom-right indicator */}
            <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base  h-full  flex justify-center items-center relative">
              {columnKey === "pkgSends" && indicators.whatsapp && (
                <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg  font-bold">
                  {indicators.whatsapp}
                </span>
              )}
              {columnKey === "new" && indicators.email && (
                <span className="bg-black text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg 2xl:text-4xl font-bold">
                  {indicators.email}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl flex justify-center items-center ">{primary}</div>
            <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl ${getBackgroundColor()} h-full flex justify-center items-center`}>{secondary}</div>
            <div className="text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">{primary + 10}</div>
            <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl ${getBackgroundColor()} h-full border-t border-t-gray-300 flex justify-center items-center`}>{secondary + 8}</div>
          </>
        )}
      </div>
    </td>
  )
})

StatisticCell.displayName = "StatisticCell"

export default StatisticCell
