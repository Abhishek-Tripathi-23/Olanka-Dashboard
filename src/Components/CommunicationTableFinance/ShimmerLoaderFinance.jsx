import React from 'react';

const ShimmerLoaderFinance = () => {
  return (
    <div className="bg-white w-full md:max-w-[690px] xl:max-w-[555px] 2xl:max-w-[1400px] px-4 py-2 xl:py-2 md:min-h-[830px] md:max-h-[830px] lg:min-h-[1100px] lg:max-h-[1110px] xl:min-h-[753px] xl:max-h-[755px] 2xl:max-h-[1960px] rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <table className="bg-white rounded-2xl shadow-lg w-full min-w-[480px] 2xl:h-96" role="table" aria-label="Communication metrics table">
          {/* Header shimmer - matches TableHeaderFinance exactly */}
          <thead>
            <tr className="bg-[#1CB759] text-white">
              <th className="w-10 !w-10 p-1 sm:p-2 lg:p-3 xl:p-1 2xl:p-7 border-r border-gray-100 text-center text-xs sm:text-sm lg:text-base" scope="col" style={{ width: '2.5rem', minWidth: '2.5rem', maxWidth: '2.5rem' }}>
                <div className="flex items-center justify-center gap-1 sm:gap-0.5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="hidden sm:inline text-xs sm:text-xs lg:text-[12px] xl:text-[8px] 2xl:text-3xl">
                    <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </th>
              
              {/* Data columns headers - 7 columns for finance */}
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <th
                  key={colIndex}
                  className={colIndex === 6 ? "w-20 px-1 py-2 text-center text-xs sm:text-sm lg:text-sm" : "w-24 px-1 py-2 border-r border-gray-100 text-center text-xs sm:text-sm lg:text-base"}
                  scope="col"
                >
                  <div className="flex items-center justify-center gap-1 sm:gap-0.5">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="hidden sm:inline text-xs sm:text-xs lg:text-[12px] xl:text-[8px] 2xl:text-3xl">
                      <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table rows shimmer - matches TableRowFinance exactly */}
          <tbody>
            {Array.from({ length: 12 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {/* Name cell - matches TableRowFinance structure */}
                <td className="w-10 !w-10 2xl:w-60 p-2 sm:p-3 md:p-1.25 lg:p-4 xl:p-0 2xl:p-5 border-r border-gray-800 xl:w-32">
                  <div className="w-12 h-12 xl:h-10 2xl:w-40 flex justify-center items-center">
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-12 xl:w-7 xl:h-7 2xl:w-20 2xl:h-20 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 xl:h-4 xl:w-4 2xl:w-5 2xl:h-5 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </td>
                
                {/* Data cells - 7 columns for finance */}
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <td key={colIndex} className={`w-5 2xl:w-96 2xl:h-36 ${colIndex < 6 ? 'border-r border-gray-200' : ''} relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-12`}>
                    <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-full xl:w-20 lg:w-full 2xl:w-full">
                      <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl flex justify-center items-center">
                        <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full flex justify-center items-center">
                        <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">
                        <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                      <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">
                        <div className="h-4 w-6 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Summary row shimmer - matches SummaryRowFinance exactly */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
              <td className="w-10 !w-10 2xl:w-60 p-2 sm:p-3 md:p-1.25 lg:p-4 xl:p-0 2xl:p-5 border-r border-gray-800 xl:w-32">
                <div className="w-12 h-12 xl:h-10 2xl:w-40 flex justify-center items-center">
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </td>
              
              {Array.from({ length: 7 }).map((_, colIndex) => (
                <td key={colIndex} className={`w-5 2xl:w-96 2xl:h-36 ${colIndex < 6 ? 'border-r border-gray-200' : ''} relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-12`}>
                  <div className="grid grid-cols-2 gap-0 text-center text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-full xl:w-20 lg:w-full 2xl:w-full">
                    <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl flex justify-center items-center">
                      <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full flex justify-center items-center">
                      <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">
                      <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                    <div className="text-center font-semibold text-xs sm:text-sm lg:text-base xl:text-xs 2xl:text-4xl h-full border-t border-t-gray-300 flex justify-center items-center">
                      <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShimmerLoaderFinance;
