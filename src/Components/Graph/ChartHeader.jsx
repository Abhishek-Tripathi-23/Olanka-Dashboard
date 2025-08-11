import React from 'react'

export default function ChartHeader({ title }) {
  return (
    <div className="bg-black text-white text-center py-1 2xl:py-3 rounded-t-2xl border border-black">
      <h2 className="text-base 2xl:text-3xl font-medium">{title}</h2>
    </div>
  )
}
