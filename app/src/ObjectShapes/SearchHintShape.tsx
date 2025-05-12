import { PageShape } from "./PageShape";

export type SearchHintType = PageShape

export interface SearchHintGroupType {
  groupTitle: string;
  hintList: SearchHintType[];
}