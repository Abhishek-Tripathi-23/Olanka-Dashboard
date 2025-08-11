import React from "react"
import { COLUMNS } from "../data/communicationColumns"
import { getBadgeColorClass } from "../styles/communicationStyles"

const SummaryRow = React.memo(({ data }) => {
  // Helper function to get background color class based on column
  const getBackgroundColor = (columnKey) => {
    return columnKey === "whatsapp" ? "bg-gray-300" : "bg-gray-100"
  }

  return (
    <tr className="bg-[#C4C4C4] font-bold border-t border-gray-800">
      <td className="px-2 py-2 border-r border-gray-800 flex justify-around items-center gap-2 sm:gap-3">
        <div className="flex gap-1 sm:gap-2">
          {data.badges.map((badge, index) => (
            <div
              key={index}
              className={`w-6 h-6 sm:w-13 sm:h-13 2xl:h-28 2xl:w-28 2xl:text-5xl rounded-full flex items-center justify-center text-white text-xs sm:text-xl font-bold ${getBadgeColorClass(badge.color)}`}
              aria-label={`${badge.color} summary: ${badge.number}`}
            >
              {badge.number}
            </div>
          ))}
        </div>
      </td>

      {COLUMNS.map((column, index) => {
        const totals = data.totals[column.key]
        const isLast = index === COLUMNS.length - 1

        return (
          <td key={column.key} className={isLast ? "w-16 2xl:w-96 2xl:h-36 relative text-xs sm:text-sm lg:text-base" : "w-16 2xl:w-96 2xl:h-36 border-r border-gray-800 relative text-xs sm:text-sm lg:text-base h-full"}>
            <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base h-full">
              {/* For pkgSends and new columns - show indicators only */}
              {(column.key === "pkgSends" || column.key === "new") ? (
                <>
                  {/* Top-left indicator */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
                    {column.key === "pkgSends" && data.summaryIndicators.pkgSends && (
                      <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg font-bold">
                        {data.summaryIndicators.pkgSends.top}
                      </span>
                    )}
                    {column.key === "new" && data.summaryIndicators.new && (
                      <span className="bg-black text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg font-bold">
                        {data.summaryIndicators.new.top}
                      </span>
                    )}
                  </div>
                  {/* Top-right (empty) */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center">
                  </div>
                  {/* Bottom-left (empty) */}
                  <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full flex justify-center items-center">
                  </div>
                  {/* Bottom-right indicator */}
                  <div className="text-center text-gray-600 text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
                    {column.key === "pkgSends" && data.summaryIndicators.pkgSends && (
                      <span className="bg-blue-500 text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg font-bold">
                        {data.summaryIndicators.pkgSends.bottom}
                      </span>
                    )}
                    {column.key === "new" && data.summaryIndicators.new && (
                      <span className="bg-black text-white w-6 h-6 sm:w-8 sm:h-8 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm xl:text-lg font-bold">
                        {data.summaryIndicators.new.bottom}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* For calls, whatsapp, email columns - show normal data */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl h-full  flex justify-center items-center">{totals[0]}</div>
                  <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl bg-[#AFAFAF] h-full flex justify-center items-center `}>{totals[1]}</div>
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl h-full border-t border-t-gray-400 flex justify-center items-center">{totals[2]}</div>
                  <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base 2xl:text-4xl bg-[#AFAFAF] h-full border-t border-t-gray-400 flex justify-center items-center`}>{totals[3]}</div>
                </>
              )}
            </div>
          </td>
        )
      })}
    </tr>
  )
})

SummaryRow.displayName = "SummaryRow"

export default SummaryRow
