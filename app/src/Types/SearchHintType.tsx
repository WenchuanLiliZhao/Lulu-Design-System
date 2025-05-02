import { Page } from "./PageType";

export type SearchHintType = Page

export interface SearchHintGroupType {
  groupTitle: string;
  hintList: SearchHintType[];
}