import { PageType } from "./PageType";

export type SearchHintType = PageType

export interface SearchHintGroupType {
  groupTitle: string;
  hintList: SearchHintType[];
}