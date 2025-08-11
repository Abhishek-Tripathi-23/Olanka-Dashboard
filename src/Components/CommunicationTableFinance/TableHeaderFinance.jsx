import React from "react"
import { COLUMNS_FINANCE } from "../data/communicationDataFinance"

const TableHeaderFinance = React.memo(() => {
  return (
    <thead>
      <tr className="bg-[#1CB759] text-white">
        <th className="w-10 !w-10 p-1 sm:p-2 lg:p-3 xl:p-4 2xl:p-7 border-r border-gray-100 text-center text-xs sm:text-sm lg:text-base" scope="col" style={{ width: '2.5rem', minWidth: '2.5rem', maxWidth: '2.5rem' }}>
          <span className="sr-only">Name and Profile</span>
        </th>
        {COLUMNS_FINANCE.map((column, index) => (
          <th
            key={column.key}
            className={index === COLUMNS_FINANCE.length - 1 ? "w-20 px-1 py-2 text-center text-xs sm:text-sm lg:text-sm" : "w-24 px-1 py-2  border-r border-gray-100 text-center text-xs sm:text-sm lg:text-base"}
            scope="col"
          >
            <div className="flex items-center justify-center gap-1 sm:gap-0.5">
              {column.icon}
              <span className="hidden sm:inline text-xs sm:text-xs lg:text-[12px] 2xl:text-3xl">{column.label}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
})

TableHeaderFinance.displayName = "TableHeaderFinance"

export default TableHeaderFinance
