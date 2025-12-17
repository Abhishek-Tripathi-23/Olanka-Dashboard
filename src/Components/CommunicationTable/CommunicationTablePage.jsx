"use client"

import React, { useMemo, useState, useEffect } from "react"
import { TABLE_DATA, SUMMARY_DATA } from "../data/communicationData"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import SummaryRow from "./SummaryRow"
import HorizontalBarChart from "../Graph/HorizontalBarChart"
import ShimmerLoader from "./ShimmerLoader"
import { fetchAssistantManagers, fetchAgentsUnderAssistantManager, getDateRanges } from "../../services/apiService"
import { transformAgentData, calculateSummaryData } from "../../utils/dataTransformers"

const CommunicationTable = ({
  data = null,
  summaryData = null,
  selectedPeriod = "Last Week",
  selectedTeam = null,
  onDataLoad = null
}) => {
  const [apiData, setApiData] = useState(data)
  const [apiSummaryData, setApiSummaryData] = useState(summaryData)
  const [loading, setLoading] = useState(true) // Start with loading true
  const [error, setError] = useState(null)
  const [assistantManagerId, setAssistantManagerId] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false) // Track if data has been loaded

  // Only use provided data if it exists, otherwise use mock data only after loading fails
  const displayData = dataLoaded ? (apiData || TABLE_DATA) : TABLE_DATA
  const displaySummaryData = dataLoaded ? (apiSummaryData || SUMMARY_DATA) : SUMMARY_DATA

  const memoizedData = useMemo(() => displayData, [displayData])
  const memoizedSummaryData = useMemo(() => displaySummaryData, [displaySummaryData])

  // Use selectedTeam to set assistantManagerId
  useEffect(() => {
    if (selectedTeam && selectedTeam.id) {
      setAssistantManagerId(selectedTeam.id)
    }
  }, [selectedTeam])

  // Fetch agents data when assistant manager ID is available
  useEffect(() => {
    if (!assistantManagerId) return

    const loadAgentsData = async () => {
      try {
        setLoading(true)
        setError(null)

        const dateRanges = getDateRanges(selectedPeriod)
        const response = await fetchAgentsUnderAssistantManager(
          assistantManagerId,
          dateRanges.activityFromDate,
          dateRanges.activityToDate,
          dateRanges.stateFromDate,
          dateRanges.stateToDate
        )

        if (response.success && response.data) {
          const transformedData = transformAgentData(response.data)
          const summaryData = calculateSummaryData(transformedData)

          setApiData(transformedData)
          setApiSummaryData(summaryData)
          setDataLoaded(true) // Mark data as loaded

          // Notify parent component if callback provided
          if (onDataLoad) {
            onDataLoad(transformedData, summaryData)
          }
        } else {
          setError(response.message || 'Failed to load agents data')
          setDataLoaded(true) // Mark as loaded even on error to show fallback data
        }
      } catch (err) {
        console.error('Error loading agents data:', err)
        setError('Failed to load agents data')
        setDataLoaded(true) // Mark as loaded even on error to show fallback data
      } finally {
        setLoading(false)
      }
    }

    loadAgentsData()
  }, [assistantManagerId, selectedPeriod, onDataLoad])

  // Loading state with shimmer effect
  if (loading) {
    return <ShimmerLoader />
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full md:max-w-[690px] xl:max-w-[590px] 2xl:max-w-[1400px] px-4 py-2 rounded-2xl">
        <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">⚠️</div>
              <p className="text-red-600 mb-2">Error loading data</p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white w-full md:max-w-[690px] xl:max-w-[590px] 2xl:max-w-[1400px] px-4 py-2 rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <table className="bg-white rounded-2xl shadow-lg w-full 2xl:min-w-[680px]" role="table" aria-label="Communication metrics table">
          <TableHeader />
          <tbody>
            {memoizedData.map((row) => (
              <TableRow key={row.id} data={row} />
            ))}
            <SummaryRow data={memoizedSummaryData} />
          </tbody>
        </table>
      </div>


    </div>
  )
}

export default CommunicationTable
