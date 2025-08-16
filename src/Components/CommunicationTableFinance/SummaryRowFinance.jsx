import React from "react"
import { COLUMNS_FINANCE } from "../data/communicationDataFinance"
import { getBadgeColorClass } from "../styles/communicationStyles"

const SummaryRowFinance = React.memo(({ data }) => {
  // Helper function to get background color class based on column
  const getBackgroundColor = (columnKey) => {
    return columnKey === "engaging" ? "bg-blue-100" : "bg-green-100"
  }

  return (
    <tr className="bg-[#C4C4C4] font-bold border-t border-gray-800">
      <td className="w-10  px-2 py-2 border-r border-gray-800" style={{ width: '2.5rem', minWidth: '2.5rem', maxWidth: '2.5rem' }}>
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex gap-1 sm:gap-2">
            {/* {data.badges.map((badge, index) => (
              <div
                key={index}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold ${getBadgeColorClass(badge.color)}`}
                aria-label={`${badge.color} summary: ${badge.number}`}
              >
                {badge.number}
              </div>
            ))} */}
          </div>
        </div>
      </td>

      {COLUMNS_FINANCE.map((column, index) => {
        const isLast = index === COLUMNS_FINANCE.length - 1

        // Special handling for paid2 column
        if (column.key === "paid2") {
          return (
            <td key={column.key} className={isLast ? "w-20 relative text-xs sm:text-sm lg:text-base h-full" : "w-20  border-r border-gray-800 relative text-xs sm:text-sm lg:text-base h-full"}>
              <div className="h-full xl:w-20 flex justify-center items-center">
                <div className="bg-green-500 text-white h-12 sm:h-14 2xl:h-full  xl:h-14 w-full flex justify-center items-center font-bold text-sm sm:text-xl xl:text-xs 2xl:text-3xl">
                  {data.totalPaid}
                </div>
              </div>
            </td>
          )
        }

        const totals = data.totals[column.key]

        return (
          <td key={column.key} className={isLast ? "w-16 relative text-xs sm:text-sm sm:h-16 lg:text-base xl:text-xs h-full" : "w-16 border-r border-gray-800 relative text-xs sm:text-sm sm:h-12 lg:text-base xl:text-xs xl:h-full"}>
            <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm sm:h-14 lg:text-base xl:text-xs xl:h-14 2xl:h-full">
              {/* For followUp, he, and paid columns - show indicators only */}
              {(column.key === "followUp" || column.key === "he" || column.key === "paid") ? (
                <>
                  {/* Top-left indicator */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
                    {column.key === "followUp" && data.summaryIndicators.followUp && (
                      <span className="bg-black text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {data.summaryIndicators.followUp.top}
                      </span>
                    )}
                    {column.key === "he" && data.summaryIndicators.he && (
                      <span className="bg-blue-500 text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {data.summaryIndicators.he.top}
                      </span>
                    )}
                    {column.key === "paid" && data.summaryIndicators.paid && (
                      <span className="bg-green-500 text-white w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm  font-bold">
                        {data.summaryIndicators.paid.top}
                      </span>
                    )}
                  </div>
                  {/* Top-right (empty) */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full flex justify-center items-center">
                  </div>
                  {/* Bottom-left (empty) */}
                  <div className="text-center text-black text-xs sm:text-sm lg:text-base h-full flex justify-center items-center">
                  </div>
                  {/* Bottom-right indicator */}
                  <div className="text-center text-black text-xs sm:text-sm lg:text-base h-full flex justify-center items-center relative">
                    {column.key === "followUp" && data.summaryIndicators.followUp && (
                      <span className="bg-black text-white  w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {data.summaryIndicators.followUp.bottom}
                      </span>
                    )}
                    {column.key === "he" && data.summaryIndicators.he && (
                      <span className="bg-blue-500 text-white  w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                        {data.summaryIndicators.he.bottom}
                      </span>
                    )}
                    {column.key === "paid" && data.summaryIndicators.paid && (
                      <span className="bg-green-500 text-white  w-6 h-6 sm:w-7 sm:h-7 xl:h-6 xl:w-6 xl:text-xs 2xl:h-16 2xl:w-16 2xl:text-4xl rounded-full flex items-center justify-center text-xs sm:text-sm  font-bold">
                        {data.summaryIndicators.paid.bottom}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* For inquiries, engaging, pipeline columns - show normal data */}
                  <div className="text-center font-semibold text-xs sm:text-sm lg:text-base h-full xl:text-xs 2xl:text-4xl flex justify-center items-center">{totals[0]}</div>
                  <div className={`text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs bg-[#AFAFAF] h-full 2xl:text-4xl flex justify-center items-center`}>{totals[1]}</div>
                  <div className="text-center text-black text-xs sm:text-sm lg:text-base xl:text-xs h-full 2xl:text-4xl border-t border-t-gray-400 flex justify-center items-center">{totals[2]}</div>
                  <div className={`text-center text-black text-xs sm:text-sm lg:text-base xl:text-xs bg-[#AFAFAF] h-full 2xl:text-4xl border-t border-t-gray-400 flex justify-center items-center`}>{totals[3]}</div>
                </>
              )}
            </div>
          </td>
        )
      })}
    </tr>
  )
})

SummaryRowFinance.displayName = "SummaryRowFinance"

export default SummaryRowFinance
