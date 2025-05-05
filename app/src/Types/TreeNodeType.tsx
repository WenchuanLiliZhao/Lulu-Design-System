import { PageType } from "./PageType";

export interface TreeNodeType {
  page: PageType; // The PageType object associated with this node
  children: TreeNodeType[]; // Array of child nodes
}