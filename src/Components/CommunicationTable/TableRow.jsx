import React from "react"
import { COLUMNS } from "../data/communicationColumns"

import AvatarWithBadge from "./AvatarWithBadge"
import StatisticCell from "./StatisticCell"

const TableRow = React.memo(({ data }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors ">
      <td className="p-2 sm:p-3 lg:p-4 xl:p-3 2xl:p-5 5xl:p-6 border-r border-gray-200">
        <div className="flex justify-between items-center gap-2 xl:gap-2 2xl:gap-3 min-w-0">
          <div className="flex gap-0.5 2xl:gap-2 min-w-0 flex-1">
            <span className="text-gray-600 text-xs sm:text-sm lg:text-xs xl:text-xs 2xl:text-3xl flex-shrink-0">{data.id}.</span>
            <span className="hidden sm:inline font-medium text-xs sm:text-sm lg:text-xs 2xl:text-3xl truncate">{data.name}</span>
          </div>
          <div className="flex-shrink-0">
            <AvatarWithBadge name={data.name} badge={data.badge} image={data.image} />
          </div>
        </div>
      </td>

      {COLUMNS.map((column, index) => (
        <StatisticCell
          key={column.key}
          data={data[column.key]}
          columnKey={column.key}
          indicators={data.indicators}
          pkgSendsActive={data.pkgSendsActive}
          newActive={data.newActive}
          callsActive={data.callsActive}
          whatsappActive={data.whatsappActive}
          emailActive={data.emailActive}
          isLast={index === COLUMNS.length - 1}
        />
      ))}
    </tr>
  )
})

TableRow.displayName = "TableRow"

export default TableRow
