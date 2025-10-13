import React from "react"
import { getBadgeColorClass } from "../styles/communicationStyles"

const AvatarWithBadge = React.memo(({ name, badge, image }) => {
  return (
    <div className="relative">
      <img
        src={image || "https://www.shutterstock.com/image-photo/cheerful-brunette-business-woman-student-600nw-2246174263.jpg"}
        alt={`${name} profile picture`}
        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-6 lg:h-12 xl:w-7 xl:h-7 2xl:w-20 2xl:h-20 rounded-full object-cover"
        onError={(e) => {
          e.target.src = "https://www.shutterstock.com/image-photo/cheerful-brunette-business-woman-student-600nw-2246174263.jpg";
        }}
      />
      <div
        className={`absolute -top-1 -right-1 w-4 h-4 xl:h-4 xl:w-4 2xl:w-5 2xl:h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${getBadgeColorClass(badge.color)}`}
        aria-label={`${badge.color} badge with number ${badge.number}`}
      >
        {badge.number}
      </div>
    </div>
  )
})

AvatarWithBadge.displayName = "AvatarWithBadge"

export default AvatarWithBadge
