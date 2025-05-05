import { PageType } from "./PageType";

export interface TreeNodesType {
  page: PageType; // The PageType object associated with this node
  children: TreeNodesType[]; // Array of child nodes
}