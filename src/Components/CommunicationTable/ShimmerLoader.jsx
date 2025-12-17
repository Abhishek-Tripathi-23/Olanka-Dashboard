import React from 'react';

const ShimmerLoader = () => {
  return (
    <div className="bg-white w-full md:max-w-[690px] md:min-h-[830px] md:max-h-[830px] xl:max-w-[590px] 2xl:max-w-[1400px] px-4 py-2 lg:min-h-[1100px] lg:max-h-[1110px] xl:min-h-[753px] xl:max-h-[755px] 2xl:max-h-[1970px] rounded-2xl">
      <div className="w-full border border-black rounded-2xl mt-2 overflow-x-auto">
        <div className="bg-white rounded-2xl shadow-lg w-full 2xl:min-w-[680px]">
          {/* Header shimmer - matches TableHeader exactly */}
          <div className="bg-black text-white">
            <div className="flex">
              {/* Name column header */}
              <div className="p-2 sm:p-3 lg:p-4 border-r border-gray-600 text-center w-32 2xl:w-full">
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="hidden sm:inline text-xs sm:text-sm lg:text-base">
                    <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Data columns headers */}
              {Array.from({ length: 5 }).map((_, colIndex) => (
                <div key={colIndex} className={`p-2 sm:p-3 lg:p-4 text-center ${colIndex < 4 ? 'border-r border-gray-600' : ''}`}>
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="hidden sm:inline text-xs sm:text-sm lg:text-base">
                      <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Table rows shimmer - matches TableRow exactly */}
          <tbody>
            {Array.from({ length: 12 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {/* Name cell */}
                <td className="p-2 sm:p-3 lg:p-4 xl:p-3 2xl:p-5 5xl:p-6 border-r border-gray-200 flex justify-around items-center gap-2 xl:gap-1 2xl:gap-3 xl:w-32 2xl:w-full">
                  <div className="flex gap-0.5 2xl:gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="hidden sm:block h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="relative">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-12 xl:w-7 xl:h-7 2xl:w-20 2xl:h-20 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 xl:h-4 xl:w-4 2xl:w-5 2xl:h-5 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </td>

                {/* Data cells */}
                {Array.from({ length: 5 }).map((_, colIndex) => (
                  <td key={colIndex} className={`w-5 2xl:w-96 2xl:h-36 ${colIndex < 4 ? 'border-r border-gray-200' : ''} relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-12`}>
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

            {/* Summary row shimmer - matches SummaryRow exactly */}
            <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
              <td className="p-2 sm:p-3 lg:p-4 xl:p-3 2xl:p-5 5xl:p-6 border-r border-gray-200 flex justify-around items-center gap-2 xl:gap-1 2xl:gap-3 xl:w-32 2xl:w-full">
                <div className="flex gap-1 sm:gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </td>

              {Array.from({ length: 5 }).map((_, colIndex) => (
                <td key={colIndex} className={`w-5 2xl:w-96 2xl:h-36 ${colIndex < 4 ? 'border-r border-gray-200' : ''} relative text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl h-12`}>
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
        </div>
      </div>
    </div>
  );
};

export default ShimmerLoader;
