import { GraphLinkShape, GraphNodeShape, TopologyDataShape, baseNodeSize } from "../Components/NetworkTopology/NetworkTopology";
import { NodeShape, TreeNodesShape } from "../Components/Tree/TreeExplorer";

/**
 * Transforms a NodeShape array into a graph structure suitable for NetworkTopology
 * @param nodes - The NodeShape array to transform
 * @param defaultGroup - Default group for nodes, or a function to determine group based on node
 * @returns A TopologyDataShape with nodes and links
 */
export function transformTreeToGraph(
  nodes: NodeShape[],
  defaultGroup?: number | ((node: NodeShape) => number)
): TopologyDataShape {
  const graphNodes: GraphNodeShape[] = [];
  const graphLinks: GraphLinkShape[] = [];
  
  // Keep track of level 1 node group assignment
  let level1GroupCounter = 1;
  // Map to store node id to group mapping
  const nodeGroupMap = new Map<string, number>();

  // Function to process a node and its children recursively
  function processNode(node: NodeShape, parent?: string): void {
    // Determine group based on level
    let group: number;
    
    if (typeof defaultGroup === 'function') {
      group = defaultGroup(node);
    } else if (typeof defaultGroup === 'number') {
      group = defaultGroup;
    } else {
      const level = node.level || 0;
      
      if (level === 0) {
        // Level 0 nodes get group 0
        group = 0;
      } else if (level === 1) {
        // Level 1 nodes get sequential groups 1, 2, 3, ...
        group = level1GroupCounter++;
      } else {
        // Deeper nodes inherit their parent's group
        group = parent ? nodeGroupMap.get(parent) || 0 : 0;
      }
    }
    
    // Store the node's group for its children to reference
    nodeGroupMap.set(node.id, group);

    // Create graph node
    const graphNode: GraphNodeShape = {
      id: node.id,
      name: node.name,
      type: node.type,
      group,
      level: node.level || 0,
      size: baseNodeSize * (1 / ((node.level || 0) + 1)), // Size decreases with increasing level
      children: [], // We'll handle children separately for graph representation
    };

    // Add to nodes array
    graphNodes.push(graphNode);

    // If this node has a parent, create a link
    if (parent) {
      graphLinks.push({
        source: parent,
        target: node.id
      });
    }

    // Process children
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        processNode(child, node.id);
      });
    }
  }

  // Start processing from top-level nodes
  nodes.forEach(node => {
    processNode(node);
  });

  return {
    nodes: graphNodes,
    links: graphLinks
  };
}

/**
 * Transforms a TreeNodesShape array into a NodeShape array, then into a graph structure
 * @param treeNodes - The TreeNodesShape array to transform
 * @param defaultGroup - Default group for nodes, or a function to determine group
 * @returns A TopologyDataShape with nodes and links
 */
export function transformTreeNodesToGraph(
  treeNodes: TreeNodesShape[],
  defaultGroup?: number | ((node: NodeShape) => number)
): TopologyDataShape {
  // First transform TreeNodesShape to NodeShape
  const nodeShapes: NodeShape[] = treeNodes.map(treeNode => ({
    id: treeNode.page.info.slug,
    name: treeNode.page.info.title,
    type: treeNode.page.info.type,
    children: transformTreeNodesToNodeShapes(treeNode.children),
    level: 0,
    tags: treeNode.page.info.tags
  }));

  // Then transform to graph
  return transformTreeToGraph(nodeShapes, defaultGroup);
}

/**
 * Helper function to recursively transform TreeNodesShape[] to NodeShape[]
 */
function transformTreeNodesToNodeShapes(
  treeNodes: TreeNodesShape[],
  level: number = 1
): NodeShape[] {
  return treeNodes.map(treeNode => ({
    id: treeNode.page.info.slug,
    name: treeNode.page.info.title,
    type: treeNode.page.info.type,
    level,
    tags: treeNode.page.info.tags,
    children: transformTreeNodesToNodeShapes(treeNode.children, level + 1)
  }));
} 