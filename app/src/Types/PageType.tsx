import { ReactNode } from "react"

export interface PageInfo {
  slug: string
  title: string
  title_display: string | undefined
}

export interface Page {
  info: PageInfo
  content: ReactNode
}