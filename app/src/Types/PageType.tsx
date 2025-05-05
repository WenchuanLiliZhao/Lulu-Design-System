import { ReactNode } from "react"

export interface PageInfo {
  slug: string
  title: string
  title_display: string | undefined
  date: Date
  icon?: string
}

export interface PageType {
  info: PageInfo
  content: ReactNode
}