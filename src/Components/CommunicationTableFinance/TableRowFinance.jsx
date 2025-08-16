import React from "react"
import { COLUMNS_FINANCE } from "../data/communicationDataFinance"

import AvatarWithBadge from "../CommunicationTable/AvatarWithBadge"
import StatisticCellFinance from "./StatisticCellFinance"

const TableRowFinance = React.memo(({ data }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="w-10 !w-10 2xl:w-60 p-2 sm:p-3 lg:p-4 xl:p-0 2xl:p-5  border-r border-gray-800 xl:w-32 " >
        <div className="w-12 h-12 xl:h-10 2xl:w-40 flex justify-center items-center">
          <AvatarWithBadge name={data.name} badge={data.badge} />
        </div>
      </td>

      {COLUMNS_FINANCE.map((column, index) => (
        <StatisticCellFinance
          key={column.key}
          data={data[column.key]}
          columnKey={column.key}
          indicators={data.indicators}
          followUpActive={data.followUpActive}
          heActive={data.heActive}
          inquiriesActive={data.inquiriesActive}
          engagingActive={data.engagingActive}
          pipelineActive={data.pipelineActive}
          paidActive={data.paidActive}
          isLast={index === COLUMNS_FINANCE.length - 1}
        />
      ))}
    </tr>
  )
})

TableRowFinance.displayName = "TableRowFinance"

export default TableRowFinance
