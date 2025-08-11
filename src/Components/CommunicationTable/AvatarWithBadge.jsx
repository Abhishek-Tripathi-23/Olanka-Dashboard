import React from "react"
import { getBadgeColorClass } from "../styles/communicationStyles"

const AvatarWithBadge = React.memo(({ name, badge }) => {
  return (
    <div className="relative">
      <img
        src="https://www.shutterstock.com/image-photo/cheerful-brunette-business-woman-student-600nw-2246174263.jpg"
        alt={`${name} profile picture`}
        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 rounded-full object-cover"
      />
      <div
        className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${getBadgeColorClass(badge.color)}`}
        aria-label={`${badge.color} badge with number ${badge.number}`}
      >
        {badge.number}
      </div>
    </div>
  )
})

AvatarWithBadge.displayName = "AvatarWithBadge"

export default AvatarWithBadge
