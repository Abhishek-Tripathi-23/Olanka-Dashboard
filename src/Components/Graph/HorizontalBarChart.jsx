import ChartHeader from "./ChartHeader"
import ChartGrid from "./ChartGrid"
import ChartLegend from "./ChartLegend"
import { chartData } from "../data/chartData"

export default function HorizontalBarChart({ selectedTeam = null }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg overflow-hidden w-full md:max-w-[400px] md:h-[830px]   xl:w-[300px]  xl:max-w-[500px] lg:h-[1100px] xl:min-h-[748px] xl:max-h-[750px]  2xl:w-[750px] 2xl:max-w-[800px] 2xl:min-h-[1970px] 2xl:max-h-[1970px]">
      <ChartHeader title="Last 21 Days" />
      <div className="p-4 rounded-b-2xl border border-black  2xl:max-h-[1970px]">
        <ChartGrid data={chartData} />
        <ChartLegend />
      </div>
    </div>
  )
}
