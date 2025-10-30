"use client"

import React, { useMemo, useState, useEffect } from "react"
import { TABLE_DATA_FINANCE, SUMMARY_DATA_FINANCE } from "../data/communicationDataFinance"
import TableHeaderFinance from "./TableHeaderFinance"
import TableRowFinance from "./TableRowFinance"
import SummaryRowFinance from "./SummaryRowFinance"
import ShimmerLoaderFinance from "./ShimmerLoaderFinance"
import { fetchAssistantManagers, fetchAgentsUnderAssistantManager, fetchCountOfPaymentsAndPipelines, getDateRanges } from "../../services/apiService"
import { transformFinanceData, calculateFinanceSummaryData } from "../../utils/financeDataTransformers"

const CommunicationTableFinance = ({
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
  const [paymentsPipelinesData, setPaymentsPipelinesData] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false) // Track if data has been loaded

  // Only use provided data if it exists, otherwise use mock data only after loading fails
  const displayData = dataLoaded ? (apiData || TABLE_DATA_FINANCE) : TABLE_DATA_FINANCE
  const displaySummaryData = dataLoaded ? (apiSummaryData || SUMMARY_DATA_FINANCE) : SUMMARY_DATA_FINANCE

  const memoizedData = useMemo(() => displayData, [displayData])
  const memoizedSummaryData = useMemo(() => displaySummaryData, [displaySummaryData])

  // Use selectedTeam to set assistantManagerId
  useEffect(() => {
    if (selectedTeam && selectedTeam.id) {
      setAssistantManagerId(selectedTeam.id)
    }
  }, [selectedTeam])

  // Fetch agents data and payments/pipelines data when assistant manager ID is available
  useEffect(() => {
    if (!assistantManagerId) return

    const loadFinanceData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const dateRanges = getDateRanges(selectedPeriod)
        
        // Fetch both agents data and payments/pipelines data in parallel
        const [agentsResponse, paymentsResponse] = await Promise.all([
          fetchAgentsUnderAssistantManager(
            assistantManagerId,
            dateRanges.activityFromDate,
            dateRanges.activityToDate,
            dateRanges.stateFromDate,
            dateRanges.stateToDate
          ),
          fetchCountOfPaymentsAndPipelines(assistantManagerId)
        ])

        if (agentsResponse.success && agentsResponse.data) {
          const transformedData = transformFinanceData(agentsResponse.data, paymentsResponse.data)
          const summaryData = calculateFinanceSummaryData(transformedData, paymentsResponse.data)
          
          setApiData(transformedData)
          setApiSummaryData(summaryData)
          setPaymentsPipelinesData(paymentsResponse.data)
          setDataLoaded(true) // Mark data as loaded
          
          // Notify parent component if callback provided
          if (onDataLoad) {
            onDataLoad(transformedData, summaryData)
          }
        } else {
          setError(agentsResponse.message || 'Failed to load agents data')
          setDataLoaded(true) // Mark as loaded even on error to show fallback data
        }
      } catch (err) {
        console.error('Error loading finance data:', err)
        setError('Failed to load finance data')
        setDataLoaded(true) // Mark as loaded even on error to show fallback data
      } finally {
        setLoading(false)
      }
    }

    loadFinanceData()
  }, [assistantManagerId, selectedPeriod, onDataLoad])

  // Loading state with shimmer effect
  if (loading) {
    return <ShimmerLoaderFinance />
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white w-full md:max-w-[690px] xl:max-w-[555px] 2xl:max-w-[1400px] px-4 py-2 xl:py-2 md:min-h-[830px] md:max-h-[830px] lg:min-h-[1100px] lg:max-h-[1110px] xl:min-h-[753px] xl:max-h-[755px] 2xl:max-h-[1960px] rounded-2xl">
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
    <div className="bg-white w-full md:max-w-[690px] xl:max-w-[555px] 2xl:max-w-[1400px]  px-4 py-2 xl:py-2 md:min-h-[830px] md:max-h-[830px] lg:min-h-[1100px] lg:max-h-[1110px] xl:min-h-[753px] xl:max-h-[755px] 2xl:max-h-[1960px] rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <table className="bg-white rounded-2xl shadow-lg  w-full min-w-[480px] 2xl:h-96" role="table" aria-label="Communication metrics table">
          <TableHeaderFinance />
          <tbody>
            {memoizedData.map((row) => (
              <TableRowFinance key={row.id} data={row} />
            ))}
            <SummaryRowFinance data={memoizedSummaryData} />
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default CommunicationTableFinance
