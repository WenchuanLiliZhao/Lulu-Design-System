import { NodeShape, TreeNodesShape } from "../Components/Tree/TreeExplorer";
import { PageType } from "../ObjectShapes/PageShape";

interface GraphNodeShape extends Omit<NodeShape, 'children'> {
  group?: number;
  size: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
  children?: GraphNodeShape[]; // Override children to be optional and of GraphNodeShape type
  type: PageType; // Explicitly include the type to use PageType
}

interface GraphLinkShape {
  source: string | GraphNodeShape;
  target: string | GraphNodeShape;
  index?: number;
}

interface TopologyDataShape {
  nodes: GraphNodeShape[];
  links: GraphLinkShape[];
}

/**
 * Transforms a NodeShape array into a graph structure suitable for NetworkTopology
 * @param nodes - The NodeShape array to transform
 * @param defaultSize - Default size for nodes
 * @param defaultGroup - Default group for nodes, or a function to determine group based on node
 * @returns A TopologyDataShape with nodes and links
 */
export function transformTreeToGraph(
  nodes: NodeShape[],
  defaultSize: number = 4,
  defaultGroup?: number | ((node: NodeShape) => number)
): TopologyDataShape {
  const graphNodes: GraphNodeShape[] = [];
  const graphLinks: GraphLinkShape[] = [];

  // Function to process a node and its children recursively
  function processNode(node: NodeShape, parent?: string): void {
    // Determine group - either use default, calculate from function, or derive from level
    let group: number;
    if (typeof defaultGroup === 'function') {
      group = defaultGroup(node);
    } else if (typeof defaultGroup === 'number') {
      group = defaultGroup;
    } else {
      // Derive group from level or some other property
      group = (node.level || 0) + 1;
    }

    // Create graph node
    const graphNode: GraphNodeShape = {
      id: node.id,
      name: node.name,
      type: node.type,
      group,
      size: node.children?.length ? defaultSize : defaultSize / 2, // Larger size for nodes with children
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
 * @param defaultSize - Default size for nodes
 * @param defaultGroup - Default group for nodes, or a function to determine group
 * @returns A TopologyDataShape with nodes and links
 */
export function transformTreeNodesToGraph(
  treeNodes: TreeNodesShape[],
  defaultSize: number = 4,
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
  return transformTreeToGraph(nodeShapes, defaultSize, defaultGroup);
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