import { PageShape } from "./PageShape";

export interface TreeNodesType {
  page: PageShape; // The PageType object associated with this node
  children: TreeNodesType[]; // Array of child nodes
}