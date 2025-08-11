import { Phone, Package, MessageCircle, Plus, Mail } from "lucide-react"

export const COLUMNS = [
  { key: "calls", icon: <Phone className="w-3 h-3 sm:w-4 sm:h-4 2xl:h-6 2xl:w-6" />, label: "Calls" },
  { key: "pkgSends", icon: <Package className="w-3 h-3 sm:w-4 sm:h-4 2xl:h-6 2xl:w-6" />, label: "PKG Sends" },
  { key: "whatsapp", icon: <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 2xl:h-6 2xl:w-6" />, label: "Whatsapp" },
  { key: "new", icon: <Plus className="w-3 h-3 sm:w-4 sm:h-4 2xl:h-6 2xl:w-6" />, label: "New" },
  { key: "email", icon: <Mail className="w-3 h-3 sm:w-4 sm:h-4 2xl:h-6 2xl:w-6" />, label: "Email" },
]
