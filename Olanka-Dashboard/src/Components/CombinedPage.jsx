import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import CommunicationTable from "./CommunicationTable/CommunicationTablePage"
import HorizontalBarChart from "./Graph/HorizontalBarChart"
import CommunicationTableFinance from "./CommunicationTableFinance/CommunicationTablePageFinance"
import { Menu, Settings, Sliders } from "lucide-react"

export const CombinedPage = () => {
  
    
 

    return(
      <div className=" flex flex-col">
       <div className="bg-[#F0DCE3] px-3 py-3 lg:px-6 lg:py-4 flex items-center justify-between w-full">
  {/* Left Section - Title and Time Filter */}
  <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
    <div className="min-w-0">
      <h1 className="text-xs lg:text-lg font-semibold text-gray-900 truncate">
        Sales Activity - KPI
      </h1>
      <div className="flex gap-1 lg:gap-2 items-center">
        <Sliders className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 flex-shrink-0" />
        <p className="text-xs lg:text-sm text-gray-600 whitespace-nowrap">
          Last 24 Hours
        </p>
      </div>
    </div>
  </div>

  {/* Center Section - Team Info */}
  <div className="bg-white rounded-full px-2 py-1 lg:px-4 lg:py-2 flex items-center gap-2 lg:gap-3 shadow-sm mx-2 lg:mx-0 flex-shrink-0">
    <div className="w-5 h-5 lg:w-8 lg:h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="text-white font-bold text-xs lg:text-sm">V</span>
    </div>
    <span className="text-gray-900 font-medium text-xs lg:text-lg whitespace-nowrap hidden sm:inline">
      Team Victorious
    </span>
    <span className="text-gray-900 font-medium text-xs sm:hidden">
      Team V
    </span>
  </div>

  {/* Right Section - Time Period Filter */}
  <div className="flex items-center gap-2 lg:gap-3 flex-1 justify-end min-w-0">
    <span className="text-gray-900 font-medium text-xs lg:text-base hidden sm:inline">
      This Month
    </span>
    <span className="text-gray-900 font-medium text-xs sm:hidden">
      Month
    </span>
    <Sliders className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600 flex-shrink-0" />
  </div>
</div>


    <div className="flex flex-col gap-4 xl:flex-1 xl:grid xl:grid-flow-col 2xl:justify-around xl:auto-cols-max xl:gap-10 overflow-x-auto p-6 bg-[#F0DCE3] w-full min-h-screen">
  <CommunicationTable/>
  <HorizontalBarChart/>
  <CommunicationTableFinance/>
</div>
        </div>
    )
}