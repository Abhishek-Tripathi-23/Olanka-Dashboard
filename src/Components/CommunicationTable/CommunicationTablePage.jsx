"use client"

import React, { useMemo } from "react"
import { TABLE_DATA, SUMMARY_DATA } from "../data/communicationData"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import SummaryRow from "./SummaryRow"
import HorizontalBarChart from "../Graph/HorizontalBarChart"

const CommunicationTable = ({ data = TABLE_DATA, summaryData = SUMMARY_DATA }) => {
  const memoizedData = useMemo(() => data, [data])
  const memoizedSummaryData = useMemo(() => summaryData, [summaryData])

  return (
    <div className="bg-white w-full  xl:max-w-[550px] 2xl:max-w-[1400px]  px-4 py-2 xl:max-h-[755px] 2xl:max-h-[1970px] rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <table className="bg-white rounded-2xl shadow-lg w-full 2xl:min-w-[680px]" role="table" aria-label="Communication metrics table">
          <TableHeader />
          <tbody>
            {memoizedData.map((row) => (
              <TableRow key={row.id} data={row} />
            ))}
            <SummaryRow data={memoizedSummaryData} />
          </tbody>
        </table>
      </div>
      
      
    </div>
  )
}

export default CommunicationTable
