export const styles = {
    container: "min-h-screen bg-purple-100 p-2 sm:p-4 lg:p-8 xl:p-10 5xl:p-12", // Added padding for 5xl
    tableWrapper: "max-w-7xl mx-auto",
    table: "bg-white rounded-2xl shadow-lg overflow-hidden w-full h-screen",
  
    // Header styles
    headerRow: "bg-black text-white",
    headerCell: "p-2 sm:p-3 lg:p-4 xl:p-5 5xl:p-6 border-r border-gray-600 text-center text-xs sm:text-sm lg:text-base",
    headerCellLast: "p-2 sm:p-3 lg:p-4 xl:p-5 5xl:p-6 text-center text-xs sm:text-sm lg:text-base",
    headerContent: "flex items-center justify-center gap-1 sm:gap-2",
    headerText: "hidden sm:inline text-xs sm:text-sm lg:text-base",
  
    // Row styles
    tableRow: "border-b border-gray-200 hover:bg-gray-50 transition-colors",
    nameCell: "p-2 sm:p-3 lg:p-4 xl:p-5 5xl:p-6 border-r border-gray-200 flex items-center gap-2 sm:gap-3",
    statisticCell: "p-1 sm:p-2 lg:p-3 xl:p-4 5xl:p-5 border-r border-gray-200 relative text-xs sm:text-sm lg:text-base",
    statisticCellLast: "p-1 sm:p-2 lg:p-3 xl:p-4 5xl:p-5 relative text-xs sm:text-sm lg:text-base",
  
    // Avatar styles
    avatar: "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 5xl:w-14 5xl:h-14 rounded-full object-cover",
    avatarContainer: "relative",
  
    // Badge styles
    badge: "absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold",
    badgeGreen: "bg-green-500",
    badgeYellow: "bg-yellow-500",
    badgeRed: "bg-red-500",
  
    // Indicator styles
    indicatorBlue: "absolute w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold",
    indicatorBlack: "absolute w-4 h-4 sm:w-5 sm:h-5 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold",
    indicatorTopRight: "top-1 right-1",
    indicatorBottomRight: "bottom-1 right-1",
  
    // Data grid styles
    dataGrid: "grid grid-cols-2 gap-1 text-center text-xs sm:text-sm lg:text-base",
    primaryValue: "font-semibold text-xs sm:text-sm lg:text-base",
    secondaryValue: "text-gray-600 text-xs sm:text-sm lg:text-base",
  
    // Summary styles
    summaryRow: "bg-gray-100 font-bold border-t-2 border-gray-300",
    summaryBadges: "flex gap-1 sm:gap-2",
    summaryBadge: "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold",
    summaryIndicator: "absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
  
    // Text styles
    rowNumber: "text-gray-600 text-xs sm:text-sm lg:text-base",
    name: "hidden sm:inline font-medium text-xs sm:text-sm lg:text-base",
  
    // Screen reader only
    srOnly: "sr-only",
}

export function getBadgeColorClass(color) {
    const colorMap = {
        green: styles.badgeGreen,
        yellow: styles.badgeYellow,
        red: styles.badgeRed,
    }
    return colorMap[color]
}
  