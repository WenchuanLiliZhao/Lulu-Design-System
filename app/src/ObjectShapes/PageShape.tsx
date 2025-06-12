import { ReactNode } from "react"
import { Icon } from "../Components/Icon"

export type PageType = "page" | "database" | "dataset" | "chart" | "key" | "dashboard" | "report" | "tag"


export interface PageInfo {
  slug: string
  title: string
  title_display?: string | undefined
  date: Date
  type: PageType
  tags?: string[]
  metadata?: {
    id: string
    dataName: string
    dataType: string
    favoriteTime?: string
    subscriptionTime?: string
  }
}

export interface PageShape {
  info: PageInfo
  content: ReactNode
}

interface PageIconProps {
  icon: PageType
  className?: string
}

export const IconByType: React.FC<PageIconProps> = ({ icon, className }) => {
  switch (icon) {
    case "page":
      return <Icon icon="draft" className={className} />
    case "database":
      return <Icon icon="database" className={className} />
    case "dataset":
      return <Icon icon="dataset" className={className} />
    case "chart":
      return <Icon icon="bar_chart" className={className} />
    case "key":
      return <Icon icon="key" className={className} />
    case "dashboard":
      return <Icon icon="avg_pace" className={className} />
    case "report":
      return <Icon icon="docs" className={className} />
    default:
      return null
  }
}