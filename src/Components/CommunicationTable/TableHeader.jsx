import React from "react"
import { COLUMNS } from "../data/communicationColumns"


const TableHeader = React.memo(() => {
  return (
    <thead className="">
      <tr className= "bg-black text-white ">
        <th className="p-1 sm:p-2 lg:p-3 xl:p-1 2xl:p-7   border-r border-gray-600 text-center text-xs sm:text-sm lg:text-base" scope="col">
          <span className="sr-only">Name and Profile</span>
        </th>
        {COLUMNS.map((column, index) => (
          <th
            key={column.key}
            className={index === COLUMNS.length - 1 ? "xl:w-10 2xl:w-24 px-1 py-1 text-center text-xs sm:text-sm lg:text-sm" : " w-24 px-1 py-2 border-r border-gray-600 text-center text-xs sm:text-sm lg:text-base"}
            scope="col"
          >
            <div className="flex items-center justify-center gap-1">
              {column.icon}
              <span className= "hidden sm:inline text-xs sm:text-sm lg:text-[8px] 2xl:text-3xl">{column.label}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
})

TableHeader.displayName = "TableHeader"

export default TableHeader
