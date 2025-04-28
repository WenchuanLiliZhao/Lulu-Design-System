export interface TreeNodeType {
  id: string; // Unique identifier for the node
  name: string; // Display name of the node
  dataCount: number; // count of data entries under this node
  isSensitive: boolean; // flag indicating if the data is sensitive
  dataLevel: string; // classification level of the data
  children: TreeNodeType[]; // array of child nodes
}