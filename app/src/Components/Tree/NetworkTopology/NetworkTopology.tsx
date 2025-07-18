import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { mergeTagsOfTreeNodes, NodeShape } from '../TreeExplorer';
import { PageType } from '../../../ObjectShapes/PageShape';
import { transformTreeToGraph } from '../../../Utils/TreeToGraphTransformer';
import { Example_TreeNodeMaps } from '../../../ObjectShapes/ExampleData/Example_TreeNodes';
import { transformTreeNodes } from '../TreeExplorer';
import { TopologyShortKeys } from './Elements/TopologyShortKeys';
import { TopologyToolHints } from './Elements/TopologyToolHints';
import { svgZoom, addDoubleClickResetHandler } from './Elements/svgZoom';
import { createCircles } from './Elements/createCircles';
import { createLabels } from './Elements/createLabels';
import { createLines } from './Elements/createLines';
import { nodeGroupColors } from './Elements/nodeGroupColors';

// Import necessary modules and components
// Import styles, hooks, and D3 library
// Import utility functions and data transformations
// Import components for visual elements and interactions

// Define constants for visualization settings
// These constants control the appearance and behavior of the graph

export const initialZoomLevel = 0.8;
export const baseNodeSize = 10;
export const sizeFactor = 2.4;
export const sizePower = 1.1;
export const secondaryNodeOpacity = 0.24;
export const nodeToHideOpacity = 0.24;
{/*
Let
$$
s = \frac{bg}{l^c + g}
$$
where $s$ is the node size, $b$ is the `baseNodeSize`, $g$ is the `sizeFactor`, $l$ is the current node level, and $c$ is the `sizePower`.  
*/}

// velocityDecay is now passed as a prop
const minZoom = 0.1; // Minimum zoom scale - limits how far users can zoom out
const maxZoom = 5; // Maximum zoom scale - limits how far users can zoom in

// Define interfaces for graph data structures
// GraphNodeShape: Represents a node in the graph
// GraphLinkShape: Represents a link between nodes
// SimulationNode and SimulationLink: Used in D3 force simulation
// TopologyDataShape: Structure for graph data
// NetworkTopologyProps: Props for the NetworkTopology component

export interface GraphNodeShape extends Omit<NodeShape, 'children'> {
  group?: number;
  color?: string; // Add optional color property for hex color values
  size: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
  level: number;
  children?: GraphNodeShape[]; // Override children to be optional and of GraphNodeShape type
  type: PageType; // Explicitly include the type to use PageType
}

export interface GraphLinkShape {
  source: string | GraphNodeShape;
  target: string | GraphNodeShape;
  index?: number;
}

export interface SimulationNode extends GraphNodeShape {
  x?: number;
  y?: number;
}

interface SimulationLink extends GraphLinkShape {
  source: SimulationNode;
  target: SimulationNode;
}

export interface TopologyDataShape {
  nodes: GraphNodeShape[];
  links: GraphLinkShape[];
}

interface NetworkTopologyProps {
  data?: TopologyDataShape;
  width?: number;
  height?: number;
  treeData?: NodeShape[]; // Add support for directly passing tree data
  defaultExpandLevel?: number;
  repulsionStrength?: number; // Add support for dynamic repulsion strength
  linkDistance?: number;
  velocityDecay?: number;
  nodeRadius?: number;
  initialZoomLevel?: number;
  alphaDecay?: number;
  collideRadius?: number;
  dynamicLinkFactor?: number; // Factor for dynamic link distance adjustment based on node degree
}

// Define defaultData using existing imports
const defaultData = transformTreeToGraph(mergeTagsOfTreeNodes(transformTreeNodes(Example_TreeNodeMaps.Math)));

// Adjust the colorScale to use strings for the domain
const colorScale = d3.scaleOrdinal<string, string>()
  .domain(Object.keys(nodeGroupColors))
  .range(Object.values(nodeGroupColors));

// Ensure defaultData is used in the component
const NetworkTopology = ({ 
  data = defaultData, 
  width = 800, 
  height = 600, 
  treeData,
  defaultExpandLevel,
  repulsionStrength = -150,
  linkDistance = 80,
  velocityDecay = 0.2,
  nodeRadius = 20,
  initialZoomLevel: propInitialZoomLevel = initialZoomLevel,
  alphaDecay = 0.00008,
  collideRadius = 0.5,
  dynamicLinkFactor = 0.3
}: NetworkTopologyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Convert tree data to graph data if provided
  const graphData = treeData ? transformTreeToGraph(treeData) : data;
  
  // Track the currently focused node
  let focusedNodeId: string | null = null;

  // Log debug information for tags validation
  console.log('NetworkTopology tags debug:');
  console.log('First node tags:', graphData.nodes[0]?.tags);
  console.log('Sample of all nodes tags:', graphData.nodes.slice(0, 3).map(n => ({ id: n.id, tags: n.tags })));

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll('*').remove();

    /****************************
     * INITIALIZATION & SETUP
     ****************************/
    // Set up SVG and container group for graph elements
    // Initialize color scheme and tracking sets/maps
    const svg = d3.select(svgRef.current);
    
    // Create a container group for all graph elements
    // This allows us to transform (zoom/pan) all elements together
    const g = svg.append("g")
      .attr("class", styles["graph-container"]);
    
    // Track which nodes have hidden children
    const nodesWithHiddenChildren = new Set<string>();
    
    // Map to track which children are hidden by which parent node
    const hiddenChildrenMap = new Map<string, Set<string>>();
    
    // Track the currently hovered node for Command+hover interaction
    let currentlyHoveredNode: SimulationNode | null = null;
    
    /****************************
     * ZOOM AND PAN FUNCTIONALITY
     ****************************/
    // Set up zoom and pan behavior with D3 zoom
    const { zoom } = svgZoom({
      svgElement: svgRef.current,
      width,
      height,
      initialZoomLevel: propInitialZoomLevel,
      minZoom,
      maxZoom,
      onZoom: (transform) => {
        g.attr("transform", transform.toString());
      },
    });

    if (!zoom) return;

    // Add double-click handler to reset zoom level
    addDoubleClickResetHandler(svgRef.current, zoom, propInitialZoomLevel, width, height);

    /****************************
     * FORCE SIMULATION SETUP
     ****************************/
    /**
     * The force simulation controls how nodes move and interact.
     * - link: Maintains distance between connected nodes
     * - charge: Creates repulsion/attraction between nodes
     * - center: Centers the graph in the viewport
     * - collide: Prevents nodes from overlapping
     */
    // Calculate node degrees (number of connections)
    const nodeDegrees = new Map<string, number>();
    graphData.nodes.forEach(node => {
      nodeDegrees.set(node.id, 0);
    });
    graphData.links.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
      const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
      nodeDegrees.set(sourceId, (nodeDegrees.get(sourceId) || 0) + 1);
      nodeDegrees.set(targetId, (nodeDegrees.get(targetId) || 0) + 1);
    });

    const simulation = d3.forceSimulation<SimulationNode>()
      .force("link", d3.forceLink<SimulationNode, SimulationLink>()
        .id(d => d.id)
        .distance((d) => {
          // Dynamic link distance based on node degrees
          const sourceId = typeof d.source === 'string' ? d.source : (d.source as GraphNodeShape).id;
          const targetId = typeof d.target === 'string' ? d.target : (d.target as GraphNodeShape).id;
          const sourceDegree = nodeDegrees.get(sourceId) || 1;
          const targetDegree = nodeDegrees.get(targetId) || 1;
          const maxDegree = Math.max(sourceDegree, targetDegree);
          
          // Increase link distance for high-degree nodes to give them more space
          // Formula: baseDistance + (maxDegree - 1) * spacing factor
          return linkDistance + (maxDegree - 1) * (linkDistance * dynamicLinkFactor);
        }))
      .force("charge", d3.forceManyBody().strength(repulsionStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide()
        .radius(() => nodeRadius + collideRadius)
        .iterations(4))
      .velocityDecay(velocityDecay); // Controls node movement speed

    /****************************
     * NODES, LINKS, AND LABELS CREATION & STYLING
     ****************************/
    /**
     * Creates the circles (nodes), lines (links), and text labels for each node.
     * Each node represents an entity in the network, each link connects two nodes,
     * and labels show the node name and move with the node.
     */
    

    const link = createLines({
      graphData,
      g
    });

    const nodeElements = createCircles({
      graphData,
      color: colorScale,
      g
    });
    
    const { nodeGroups, nodes: node, focusRings } = nodeElements;

    const labels = createLabels({
      graphData,
      g
    });

    /****************************
     * INITIAL EXPAND LEVEL SETUP
     ****************************/
    /**
     * Initialize node visibility based on defaultExpandLevel:
     * - If defaultExpandLevel is undefined: show all nodes (default behavior)
     * - If defaultExpandLevel is defined: hide nodes at levels > defaultExpandLevel
     */
    if (defaultExpandLevel !== undefined) {
      // Find all nodes at levels greater than defaultExpandLevel
      const nodesToHideByLevel = new Set<string>();
      
      // Group nodes by level to process parent-child relationships
      const nodesByLevel = new Map<number, GraphNodeShape[]>();
      graphData.nodes.forEach(node => {
        if (!nodesByLevel.has(node.level)) {
          nodesByLevel.set(node.level, []);
        }
        nodesByLevel.get(node.level)!.push(node);
      });
      
      // Find parent nodes at defaultExpandLevel that should have collapsed indicators
      const parentNodesAtExpandLevel = new Set<string>();
      
      // Process each level starting from defaultExpandLevel + 1
      const expandLevel = defaultExpandLevel; // Type guard: we know it's not undefined here
      for (let level = expandLevel + 1; level <= Math.max(...graphData.nodes.map(n => n.level)); level++) {
        const nodesAtLevel = nodesByLevel.get(level) || [];
        
        nodesAtLevel.forEach(nodeAtLevel => {
          nodesToHideByLevel.add(nodeAtLevel.id);
          
          // Find parent nodes by traversing links backwards
          graphData.links.forEach(link => {
            const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
            const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
            
            // If this node is a target (child), find its source (parent)
            if (targetId === nodeAtLevel.id) {
              const parentNode = graphData.nodes.find(n => n.id === sourceId);
              if (parentNode && parentNode.level === expandLevel) {
                parentNodesAtExpandLevel.add(parentNode.id);
              }
            }
          });
        });
      }
      
      // Apply collapsed classes to nodes beyond defaultExpandLevel
      parentNodesAtExpandLevel.forEach(parentId => {
        // Find all descendants of this parent node
        const descendantIds = new Set<string>();
        
        function findAllDescendants(nodeId: string) {
          graphData.links.forEach(link => {
            const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
            const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
            
            if (sourceId === nodeId && !descendantIds.has(targetId)) {
              const targetNode = graphData.nodes.find(n => n.id === targetId);
              if (targetNode && targetNode.level > expandLevel) {
                descendantIds.add(targetId);
                findAllDescendants(targetId);
              }
            }
          });
        }
        
        findAllDescendants(parentId);
        
        // Apply collapsed classes to descendant nodes
        descendantIds.forEach(childId => {
          node.filter(n => n.id === childId)
            .classed(`collapsed-by-father-${parentId}`, true);
            
          link.filter(l => {
            const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
            const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
            return sourceId === childId || targetId === childId;
          }).classed(`collapsed-by-father-${parentId}`, true);
          
          labels.filter(label => label.id === childId)
            .classed(`collapsed-by-father-${parentId}`, true);
        });
        
        // Store the mapping and mark parent as having hidden children
        if (descendantIds.size > 0) {
          hiddenChildrenMap.set(parentId, descendantIds);
          nodesWithHiddenChildren.add(parentId);
          
          // Apply visual indicator to parent node
          node.filter(n => n.id === parentId)
            .classed(styles["child-nodes-collapsed"], true);
        }
      });
    }

    /****************************
     * DRAG BEHAVIOR
     ****************************/
    /**
     * Allows nodes to be dragged with mouse/touch.
     * - start: Fixes node position when drag starts
     * - drag: Updates node position during drag
     * - end: Releases node to simulation after drag
     */
    const dragBehavior = d3.drag<SVGCircleElement, SimulationNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        // Reset fx and fy to null to allow nodes to continue responding to forces
        d.fx = null;
        d.fy = null;
      });

    // Apply drag behavior to nodes
    node.call(dragBehavior);

    /****************************
     * CLICK ON EMPTY SPACE TO REMOVE FOCUS
     ****************************/
    /**
     * Add click handler to SVG background to remove focus when clicking empty space
     */
    svg.on("click", function(event) {
      // Check if the click target is the SVG itself (not a node or other element)
      if (event.target === this) {
        // Remove focus from any currently focused node
        if (focusedNodeId) {
          focusRings.filter(n => n.id === focusedNodeId)
            .style('opacity', 0);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          focusedNodeId = null;
        }
      }
    });

    /****************************
     * HOVER EFFECTS
     ****************************/
    /**
     * Hover interaction that highlights connected nodes.
     * When hovering over a node:
     * - The hovered node and its direct connections stay at full opacity
     * - All other nodes and links become semi-transparent
     * 
     * When Command/Control+hovering:
     * - Child nodes are shown with reduced opacity (nodeToHideOpacity)
     * - All other nodes stay at full opacity
     */
    node.on("mouseover", function(_event, d) {
      // 显示 hover 的 focus ring
      focusRings.filter(n => n.id === d.id)
        .style('opacity', focusedNodeId === d.id ? 1 : 0.5);
      // Store the current hovered node for command key interactions
      currentlyHoveredNode = d;
      
      // Check if Command/Control key is already pressed during hover
      if (isCommandKeyPressed) {
        // Apply child nodes highlighting effect
        highlightChildNodes(d.id);
      }
      // Regular hover behavior (no Command/Control key)
      else {
        // Check if this node has hidden children, if so, show them with reduced opacity
        if (nodesWithHiddenChildren.has(d.id)) {
          showHiddenChildrenOnHover(d.id);
        } else {
          // Regular highlight connected nodes behavior
          highlightConnectedNodes(d.id);
        }
      }
    })
    .on("mouseout", function(_event, d) {
      // 仅当该节点不是 focus 节点时，隐藏 focus ring
      if (focusedNodeId !== d.id) {
        focusRings.filter(n => n.id === d.id)
          .style('opacity', 0);
      }
      // Clear the currently hovered node
      currentlyHoveredNode = null;
      
      // Reset all classes instead of opacity
      node.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false)
          .classed(styles["hover-show-hidden"], false);
      link.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false)
          .classed(styles["hover-show-hidden"], false);
      labels.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false)
          .classed(styles["hover-show-hidden"], false);
    });

    /****************************
     * HIDE CHILD NODES FUNCTIONALITY
     ****************************/
    /**
     * Implements Command/Control+left-click interaction to toggle child nodes visibility.
     * - First Command/Control+left-click: Hides all child nodes
     * - Second Command/Control+left-click: Restores previously hidden child nodes
     * 
     * Also implements Command/Control+hover to temporarily show child nodes with reduced opacity.
     */
    node.on("click", function(event, d) {
      // Prevent event from bubbling up to SVG container
      event.stopPropagation();
      
      // Check if Command/Control key is pressed using the ToggleChildren function
      if (TopologyShortKeys.ToggleChildren(event)) {
        // If this node already has hidden children, restore them
        if (nodesWithHiddenChildren.has(d.id)) {
          // Get the set of child nodes that were hidden by this node
          const childNodesToRestore = hiddenChildrenMap.get(d.id) || new Set<string>();
          
          // Remove the class collapsed-by-father-{id} from all child nodes
          childNodesToRestore.forEach(childId => {
            node.filter(n => n.id === childId)
              .classed(`collapsed-by-father-${d.id}`, false);
              
            link.filter(l => {
              const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
              const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
              return sourceId === childId || targetId === childId;
            }).classed(`collapsed-by-father-${d.id}`, false);
            
            labels.filter(label => label.id === childId)
              .classed(`collapsed-by-father-${d.id}`, false);
          });
          
          // Remove the hidden children record for this node
          hiddenChildrenMap.delete(d.id);
          nodesWithHiddenChildren.delete(d.id);
          
          // Remove visual indicator
          node.filter(n => n.id === d.id)
            .classed(styles["child-nodes-collapsed"], false);
        } 
        // Otherwise, hide its children
        else {
          // Find all child nodes recursively
          const childNodeIds = new Set<string>();
          
          // Function to recursively find all descendants
          function findAllChildren(nodeId: string) {
            // Find direct children
            graphData.links.forEach(link => {
              const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
              const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
              
              // In a directed graph, source is parent and target is child
              if (sourceId === nodeId) {
                // Add this child to our set if not already processed
                if (!childNodeIds.has(targetId)) {
                  childNodeIds.add(targetId);
                  // Recursively find children of this child
                  findAllChildren(targetId);
                }
              }
            });
          }
          
          // Start recursive search from the clicked node
          findAllChildren(d.id);
          
          // Add the class collapsed-by-father-{id} to all child nodes
          childNodeIds.forEach(childId => {
            node.filter(n => n.id === childId)
              .classed(`collapsed-by-father-${d.id}`, true);
              
            link.filter(l => {
              const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
              const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
              return sourceId === childId || targetId === childId;
            }).classed(`collapsed-by-father-${d.id}`, true);
            
            labels.filter(label => label.id === childId)
              .classed(`collapsed-by-father-${d.id}`, true);
          });
          
          // Store the mapping of which children this node has hidden
          hiddenChildrenMap.set(d.id, childNodeIds);
          
          // Mark the clicked node as having hidden children and update its appearance
          if (childNodeIds.size > 0) {
            nodesWithHiddenChildren.add(d.id);
            // Apply visual indicator by adding a class
            node.filter(n => n.id === d.id)
              .classed(styles["child-nodes-collapsed"], true);
          }
        }
      }
      // Handle regular click (focus functionality)
      else {
        // If this node is already focused, unfocus it
        if (focusedNodeId === d.id) {
          focusedNodeId = null;
          // Hide the focus ring for this node
          focusRings.filter(n => n.id === d.id)
            .style('opacity', 0);
        }
        // Otherwise, focus this node and unfocus any previously focused node
        else {
          // Hide focus ring for previously focused node
          if (focusedNodeId) {
            focusRings.filter(n => n.id === focusedNodeId)
              .style('opacity', 0);
          }
          
          // Set new focused node
          focusedNodeId = d.id;
          
          // Show focus ring for the new focused node
          focusRings.filter(n => n.id === d.id)
            .style('opacity', 1);
        }
      }
    });

    /**
     * Implements keyboard interactions:
     * - Escape key: Restores all hidden nodes (kept as backup)
     * - Command/Control key: Activates Command/Control+hover effect during hover
     */
    
    // Track command/control key state
    let isCommandKeyPressed = false;
    
    // Function to show hidden children on hover
    function showHiddenChildrenOnHover(nodeId: string) {
      // Get the hidden child nodes for this parent
      const hiddenChildIds = hiddenChildrenMap.get(nodeId) || new Set<string>();
      
      // Show hidden child nodes with reduced opacity
      hiddenChildIds.forEach(childId => {
        node.filter(n => n.id === childId)
          .classed(styles["hover-show-hidden"], true);
          
        link.filter(l => {
          const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
          const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
          return sourceId === childId || targetId === childId;
        }).classed(styles["hover-show-hidden"], true);
        
        labels.filter(label => label.id === childId)
          .classed(styles["hover-show-hidden"], true);
      });
    }

    // Function to highlight child nodes with class instead of opacity
    function highlightChildNodes(nodeId: string) {
      // Find all child nodes recursively
      const childNodeIds = new Set<string>();
      
      // Function to recursively find all descendants
      function findAllChildren(currentId: string) {
        // Find direct children
        graphData.links.forEach(link => {
          const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
          const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
          
          // In a directed graph, source is parent and target is child
          if (sourceId === currentId) {
            // Add this child to our set if not already processed
            if (!childNodeIds.has(targetId)) {
              childNodeIds.add(targetId);
              // Recursively find children of this child
              findAllChildren(targetId);
            }
          }
        });
      }
      
      // Start recursive search from the provided node
      findAllChildren(nodeId);
      
      // Also check if this node has hidden children and show them
      if (nodesWithHiddenChildren.has(nodeId)) {
        const hiddenChildIds = hiddenChildrenMap.get(nodeId) || new Set<string>();
        hiddenChildIds.forEach(childId => {
          // Add hidden children to the child nodes set for consistent highlighting
          childNodeIds.add(childId);
          
          // Show hidden child nodes with the hover-show-hidden class
          node.filter(n => n.id === childId)
            .classed(styles["hover-show-hidden"], true);
            
          link.filter(l => {
            const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
            const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
            return sourceId === childId || targetId === childId;
          }).classed(styles["hover-show-hidden"], true);
          
          labels.filter(label => label.id === childId)
            .classed(styles["hover-show-hidden"], true);
        });
      }
      
      // Apply class to all child nodes instead of opacity
      node.classed(styles["node-to-hide"], n => childNodeIds.has(n.id));
      
      // Apply class to relevant links instead of opacity
      link.classed(styles["node-to-hide"], l => {
        const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
        const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
        
        return childNodeIds.has(sourceId) || childNodeIds.has(targetId);
      });
      
      // Apply class to labels of child nodes instead of opacity
      labels.classed(styles["node-to-hide"], n => childNodeIds.has(n.id));
    }
    
    // Function to highlight connected nodes (regular hover behavior)
    function highlightConnectedNodes(nodeId: string) {
      // Find connected nodes (neighbors)
      const connectedNodeIds = new Set<string>();
      connectedNodeIds.add(nodeId);
      
      // Add all directly connected nodes
      graphData.links.forEach(link => {
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
        const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
        
        if (sourceId === nodeId) connectedNodeIds.add(targetId);
        if (targetId === nodeId) connectedNodeIds.add(sourceId);
      });
      
      // Apply class to nodes instead of opacity
      node.classed(styles["irrelevant-node"], n => !connectedNodeIds.has(n.id));
      
      // Apply class to links instead of opacity
      link.classed(styles["irrelevant-node"], l => {
        const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
        const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
        return !(connectedNodeIds.has(sourceId) && connectedNodeIds.has(targetId));
      });
      
      // Apply class to labels instead of opacity
      labels.classed(styles["irrelevant-node"], n => !connectedNodeIds.has(n.id));
    }
    
    // Set up global key handlers
    window.addEventListener("keydown", (event) => {
      // Check if Command or Control key was pressed
      if ((event.key === "Meta" || event.key === "Control") && !isCommandKeyPressed) {
        isCommandKeyPressed = true;
        // If there's a node currently being hovered, apply Command/Control+hover effect
        if (currentlyHoveredNode) {
          // Reset classes first
          node.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          link.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          labels.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          
          // Apply child nodes highlighting
          highlightChildNodes(currentlyHoveredNode.id);
        }
      }
    });
    
    window.addEventListener("keyup", (event) => {
      // Check if Command or Control key was released
      if ((event.key === "Meta" || event.key === "Control") && isCommandKeyPressed) {
        isCommandKeyPressed = false;
        // If there's a node being hovered, revert to standard hover behavior
        if (currentlyHoveredNode) {
          // Reset classes first
          node.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          link.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          labels.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false)
              .classed(styles["hover-show-hidden"], false);
          
          // Apply regular hover highlighting
          highlightConnectedNodes(currentlyHoveredNode.id);
        }
      }
    });

    // Handle Escape key to restore all hidden nodes
    window.addEventListener("keydown", (event) => {
      // Check if Escape key was pressed
      if (event.key === TopologyShortKeys.RestoreAllHiddenNodes) {
        // For each node with hidden children, remove their collapsed classes
        hiddenChildrenMap.forEach((childIds, parentId) => {
          childIds.forEach(childId => {
            // Remove the class from nodes
            node.filter(n => n.id === childId)
              .classed(`collapsed-by-father-${parentId}`, false);
              
            // Remove the class from links
            link.filter(l => {
              const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
              const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
              return sourceId === childId || targetId === childId;
            }).classed(`collapsed-by-father-${parentId}`, false);
            
            // Remove the class from labels
            labels.filter(label => label.id === childId)
              .classed(`collapsed-by-father-${parentId}`, false);
          });
        });
        
        // Clear all maps and sets
        hiddenChildrenMap.clear();
        
        // Clear the visual indicators for nodes with hidden children
        node.classed(styles["child-nodes-collapsed"], false);
            
        // Clear the set of nodes with hidden children
        nodesWithHiddenChildren.clear();
      }
    });

    /****************************
     * INITIAL NODE POSITIONING
     ****************************/
    /**
     * Sets initial positions in a circular layout to prevent nodes
     * from starting in extreme or unpredictable positions.
     */
    graphData.nodes.forEach((d, i) => {
      const angle = (i / graphData.nodes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.3;
      d.x = d.x ?? width / 2 + radius * Math.cos(angle);
      d.y = d.y ?? height / 2 + radius * Math.sin(angle);
    });

    /****************************
     * SIMULATION CONFIGURATION
     ****************************/
    /**
     * Initialize the simulation with nodes and configure its behavior.
     * - alpha: Initial "temperature" of the simulation
     * - alphaDecay: How quickly simulation cools down
     * - alphaMin: When to stop the simulation
     */
    simulation.nodes(graphData.nodes as SimulationNode[])
      .on("tick", ticked)
      .alpha(1)
      .alphaDecay(alphaDecay)
      .alphaMin(0.000001);

    // Configure link force with actual link data
    const linkForce = simulation.force("link") as d3.ForceLink<SimulationNode, SimulationLink>;
    if (linkForce) {
      linkForce.links(graphData.links as SimulationLink[]);
    }

    /****************************
     * ANIMATION TICK FUNCTION
     ****************************/
    /**
     * The tick function runs on each step of the simulation.
     * It updates the positions of all visual elements (nodes, links, labels)
     * based on the current simulation state.
     */
    function ticked() {
      // Update node group positions (this will move both the main node and focus ring together)
      nodeGroups.attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`);

      // Update link positions to connect nodes
      link
        .attr("x1", d => (d.source as SimulationNode).x ?? 0)
        .attr("y1", d => (d.source as SimulationNode).y ?? 0)
        .attr("x2", d => (d.target as SimulationNode).x ?? 0)
        .attr("y2", d => (d.target as SimulationNode).y ?? 0);

      // Update label positions - position below node with gap
      labels
        .attr("x", d => d.x || 0)
        .attr("y", d => {
          const nodeRadius = d.size * 2;
          return (d.y || 0) + nodeRadius + 14; // Position below node with 8px gap
        });
    }

    /****************************
     * RESPONSIVE BEHAVIOR
     ****************************/
    /**
     * Handles resizing of the container element:
     * - Updates SVG dimensions to match container
     * - Recalculates center force to maintain centered layout
     * - Gently restarts simulation to re-center nodes
     */
    const resizeObserver = new ResizeObserver(() => {
      const svgElement = svgRef.current;
      if (!svgElement || !svgElement.parentElement) return;
      
      const containerWidth = svgElement.parentElement.clientWidth;
      const containerHeight = svgElement.parentElement.clientHeight || 600;
      
      svg.attr('width', containerWidth)
         .attr('height', containerHeight);
         
      simulation.force('center', d3.forceCenter(containerWidth / 2, containerHeight / 2));
      
      // Restart with a gentle alpha to avoid dramatic reorganization
      simulation.alpha(0.1).restart();
    });

    // Observe parent element size changes
    if (svgRef.current.parentElement) {
      resizeObserver.observe(svgRef.current.parentElement);
    }

    // Cleanup function
    return () => {
      // Remove event listeners to prevent memory leaks
      window.removeEventListener("keydown", (event) => {
        if (event.key === "Meta" || event.key === "Control" || event.key === TopologyShortKeys.RestoreAllHiddenNodes) {
          // No-op for removal
        }
      });
      window.removeEventListener("keyup", (event) => {
        if (event.key === "Meta" || event.key === "Control") {
          // No-op for removal
        }
      });
      
      // Stop observing resize
      resizeObserver.disconnect();
      
      // Stop the simulation
      simulation.stop();
    };
  }, [graphData, width, height, defaultExpandLevel, repulsionStrength, linkDistance, velocityDecay, nodeRadius, propInitialZoomLevel, alphaDecay, collideRadius, dynamicLinkFactor]);

  return (
    <div className={styles["network-topology-container"]}>
      <TopologyToolHints />
      <svg ref={svgRef} width="100%" height="100%" className={styles["network-topology-svg"]}></svg>
    </div>
  );
};

export default NetworkTopology; 