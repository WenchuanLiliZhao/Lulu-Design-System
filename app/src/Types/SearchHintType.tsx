import { Page } from "./PageType";

export type SearchHintType = Page | string

export interface SearchHintGroupType {
  groupTitle: string;
  hintList: SearchHintType[];
}