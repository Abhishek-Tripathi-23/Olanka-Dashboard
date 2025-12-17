import React from "react"
import { COLUMNS_FINANCE } from "../data/communicationDataFinance"

import AvatarWithBadge from "../CommunicationTable/AvatarWithBadge"
import StatisticCellFinance from "./StatisticCellFinance"

const TableRowFinance = React.memo(({ data }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="p-2 sm:p-3 md:p-1.25 lg:p-4 xl:p-2 2xl:p-5 border-r border-gray-800">
        <div className="flex justify-center items-center flex-shrink-0">
          <AvatarWithBadge name={data.name} badge={data.badge} image={data.image} />
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
