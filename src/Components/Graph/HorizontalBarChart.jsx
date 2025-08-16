import ChartHeader from "./ChartHeader"
import ChartGrid from "./ChartGrid"
import ChartLegend from "./ChartLegend"
import { chartData } from "../data/chartData"

export default function HorizontalBarChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg overflow-hidden w-full  xl:w-[300px] xl:max-w-[500px] xl:max-h-[750px] max-h-[1220px] 2xl:w-[750px] 2xl:max-w-[800px] 2xl:max-h-[1970px]">
      <ChartHeader title="Last 21 Days" />
      <div className="p-4 rounded-b-2xl border border-black 2xl:max-h-[1970px]">
        <ChartGrid data={chartData} />
        <ChartLegend />
      </div>
    </div>
  )
}
