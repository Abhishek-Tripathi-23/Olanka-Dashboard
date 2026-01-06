import React, { useState, useEffect } from "react"
import ChartHeader from "./ChartHeader"
import ChartGrid from "./ChartGrid"
import ChartLegend from "./ChartLegend"
import { chartData as mockChartData } from "../data/chartData"
import { fetchCountOfPaymentsAndPipelines } from "../../services/apiService"

// Transform API data to chart format
const transformChartData = (apiData) => {
  if (!apiData || !apiData.payments || !apiData.pipelines) {
    return null
  }

  const dates = Object.keys(apiData.payments).sort()

  return dates.map(dateStr => {
    const date = new Date(dateStr)
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    return {
      date: formattedDate,
      payments: apiData.payments[dateStr] || 0,
      pipelines: apiData.pipelines[dateStr] || 0
    }
  })
}

export default function HorizontalBarChart({ selectedTeam = null, selectedRightPeriod = null }) {
  const [chartData, setChartData] = useState(mockChartData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!selectedTeam?.id) return

    const loadChartData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetchCountOfPaymentsAndPipelines(selectedTeam.id)

        if (response.success && response.data) {
          const transformedData = transformChartData(response.data)
          if (transformedData && transformedData.length > 0) {
            setChartData(transformedData)
          }
        } else {
          setError(response.message || 'Failed to load chart data')
        }
      } catch (err) {
        console.error('Error loading chart data:', err)
        setError('Failed to load chart data')
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [selectedTeam, selectedRightPeriod])

  // Calculate max value for dynamic scaling
  const maxValue = Math.max(
    ...chartData.map(d => Math.max(d.payments, d.pipelines)),
    5 // Minimum max value of 5
  )

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg overflow-hidden w-full md:max-w-[400px] md:h-[830px]   xl:w-[300px]  xl:max-w-[500px] lg:h-[1100px] xl:min-h-[748px] xl:max-h-[750px]  2xl:w-[750px] 2xl:max-w-[800px] 2xl:min-h-[1970px] 2xl:max-h-[1970px]">
      <ChartHeader title={`Last ${chartData.length} Days`} />
      <div className="p-4 rounded-b-2xl border border-black  2xl:max-h-[1970px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-gray-500">Loading chart...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-sm">{error}</div>
          </div>
        ) : (
          <ChartGrid data={chartData} maxValue={maxValue} />
        )}
        <ChartLegend />
      </div>
    </div>
  )
}

