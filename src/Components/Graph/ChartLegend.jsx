export default function ChartLegend() {
    return (
      <div className="flex justify-center gap-6 mt-6 text-sm text-gray-600 ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-sm" />
          <span>Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black rounded-sm" />
          <span>Pipelines</span>
        </div>
      </div>
    )
  }
  