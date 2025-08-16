"use client"

import React, { useMemo } from "react"
import { TABLE_DATA_FINANCE, SUMMARY_DATA_FINANCE } from "../data/communicationDataFinance"
import TableHeaderFinance from "./TableHeaderFinance"
import TableRowFinance from "./TableRowFinance"
import SummaryRowFinance from "./SummaryRowFinance"


const CommunicationTableFinance = ({ data = TABLE_DATA_FINANCE, summaryData = SUMMARY_DATA_FINANCE }) => {
  const memoizedData = useMemo(() => data, [data])
  const memoizedSummaryData = useMemo(() => summaryData, [summaryData])

  return (
    <div className="bg-white w-full xl:max-w-[550px] 2xl:max-w-[1400px]  px-4 py-2 xl:py-2 lg:min-h-[1100px] lg:max-h-[1110px] xl:min-h-[753px] xl:max-h-[755px] 2xl:max-h-[1960px] rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <table className="bg-white rounded-2xl shadow-lg w-full min-w-[480px] 2xl:h-96" role="table" aria-label="Communication metrics table">
          <TableHeaderFinance />
          <tbody>
            {memoizedData.map((row) => (
              <TableRowFinance key={row.id} data={row} />
            ))}
            <SummaryRowFinance data={memoizedSummaryData} />
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default CommunicationTableFinance
