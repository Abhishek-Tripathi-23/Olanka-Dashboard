import React from "react"
import { COLUMNS } from "../data/communicationColumns"

import AvatarWithBadge from "./AvatarWithBadge"
import StatisticCell from "./StatisticCell"

const TableRow = React.memo(({ data }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors ">
      <td className="p-2 sm:p-3 lg:p-4 xl:p-3 2xl:p-5 5xl:p-6 border-r border-gray-200 flex justify-around items-center gap-2 xl:gap-1 2xl:gap-3 xl:w-32 2xl:w-full">
        <div className="flex gap-0.5 2xl:gap-2 ">
        <span className="text-gray-600 text-xs sm:text-sm lg:text-xs xl:text-xs 2xl:text-3xl">{data.id}.</span>
        <span className="hidden sm:inline font-medium text-xs sm:text-sm lg:text-xs 2xl:text-3xl">{data.name}</span>
        </div>
        <AvatarWithBadge name={data.name} badge={data.badge} />
       
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
