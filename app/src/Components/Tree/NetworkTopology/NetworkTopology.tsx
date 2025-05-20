import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { mergeTagsOfTreeNodes, NodeShape } from '../TreeExplorer';
import { PageType } from '../../../ObjectShapes/PageShape';
import { transformTreeToGraph } from '../../../Utils/TreeToGraphTransformer';
import { Example_TreeNodeMaps } from '../../../ObjectShapes/ExampleData/Example_TreeNodes';
import { transformTreeNodes } from '../TreeExplorer';
import { NodeTagPrefix } from "./TagFilterTree";
import { TopologyShortKeys } from './Elements/TopologyShortKeys';
import { TopologyToolHints } from './Elements/TopologyToolHints';
import { svgZoom, addDoubleClickResetHandler } from './Elements/svgZoom';

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

const repulsionStrength = -100; // Controls the repulsion force between nodes. More negative values = stronger repulsion
const velocityDecay = 0.2; // Controls how quickly nodes lose momentum (0-1). Lower values = nodes move/swim faster
const minZoom = 0.1; // Minimum zoom scale - limits how far users can zoom out
const maxZoom = 5; // Maximum zoom scale - limits how far users can zoom in

export interface GraphNodeShape extends Omit<NodeShape, 'children'> {
  group?: number;
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

interface SimulationNode extends GraphNodeShape {
  x: number;
  y: number;
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
}

// Transform Example_TreeNodeMaps.Math into a format for the Network Topology
const defaultData = transformTreeToGraph(mergeTagsOfTreeNodes(transformTreeNodes(Example_TreeNodeMaps.Math)));

/**
 * NetworkTopology Component
 * 
 * A D3-based visualization for displaying network graph data with interactive features.
 * This component renders nodes (circles) and links (lines) based on the provided data,
 * and supports zoom, pan, hover effects, and node dragging.
 */
const NetworkTopology = ({ 
  data = defaultData, 
  width = 800, 
  height = 600, 
  treeData 
}: NetworkTopologyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Convert tree data to graph data if provided
  const graphData = treeData ? transformTreeToGraph(treeData) : data;

  // Debug code for tags validation
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
    const svg = d3.select(svgRef.current);
    const nodeRadius = 20;
    
    // Create a container group for all graph elements
    // This allows us to transform (zoom/pan) all elements together
    const g = svg.append("g")
      .attr("class", styles["graph-container"]);
    
    // Use a valid color scheme from d3 v4
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Track which nodes have hidden children
    const nodesWithHiddenChildren = new Set<string>();
    
    // Map to track which children are hidden by which parent node
    const hiddenChildrenMap = new Map<string, Set<string>>();
    
    // Track the currently hovered node for Command+hover interaction
    let currentlyHoveredNode: SimulationNode | null = null;
    
    /****************************
     * ZOOM AND PAN FUNCTIONALITY
     ****************************/
    const { zoom } = svgZoom({
      svgElement: svgRef.current,
      width,
      height,
      initialZoomLevel,
      minZoom,
      maxZoom,
      onZoom: (transform) => {
        g.attr("transform", transform.toString());
      },
    });

    if (!zoom) return;

    // Add double-click handler to reset zoom level
    addDoubleClickResetHandler(svgRef.current, zoom, initialZoomLevel, width, height);

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
    const simulation = d3.forceSimulation<SimulationNode>()
      .force("link", d3.forceLink<SimulationNode, SimulationLink>()
        .id(d => d.id)
        .distance(80))
      .force("charge", d3.forceManyBody().strength(repulsionStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide()
        .radius(() => nodeRadius + 0.5)
        .iterations(4))
      .velocityDecay(velocityDecay); // Controls node movement speed

    /****************************
     * LINKS CREATION & STYLING
     ****************************/
    /**
     * Creates the lines (edges) between nodes and applies styling.
     * Each link connects two nodes in the graph.
     */
    const link = g.append("g")
      .attr("class", styles.links)
      .selectAll("line")
      .data(graphData.links)
      .enter().append("line")
      .each(function(d) {
        // Combine tags from both source and target nodes
        const sourceNode = typeof d.source === 'string' 
          ? graphData.nodes.find(n => n.id === d.source) 
          : d.source as GraphNodeShape;
        
        const targetNode = typeof d.target === 'string'
          ? graphData.nodes.find(n => n.id === d.target)
          : d.target as GraphNodeShape;

        const sourceTags = sourceNode?.tags || [];
        const targetTags = targetNode?.tags || [];
        
        // Apply class for styling
        d3.select(this).classed(styles.link, true);
        
        // Apply tag classes directly (not through styles module)
        sourceTags.forEach(tag => {
          d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
        });
        
        targetTags.forEach(tag => {
          d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
        });
      });

    /****************************
     * NODES CREATION & STYLING
     ****************************/
    /**
     * Creates the circles (nodes) and applies styling based on data.
     * Each node represents an entity in the network.
     */
    const node = g.append("g")
      .attr("class", styles.nodes)
      .selectAll("circle")
      .data(graphData.nodes as SimulationNode[])
      .enter().append("circle")
      .each(function(d) {
        // Apply the styling class
        d3.select(this).classed(styles.node, true);
        
        // Apply tag classes directly (not through styles module)
        if (d.tags) {
          d.tags.forEach(tag => {
            d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
          });
        }
      })
      .attr("r", d => d.size * 2)
      .style("fill", d => color(d.group?.toString() || ""));

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
      // Store the current hovered node for command key interactions
      currentlyHoveredNode = d;
      
      // Check if Command/Control key is already pressed during hover
      if (isCommandKeyPressed) {
        // Apply child nodes highlighting effect
        highlightChildNodes(d.id);
      }
      // Regular hover behavior (no Command/Control key)
      else {
        // Highlight connected nodes
        highlightConnectedNodes(d.id);
      }
    })
    .on("mouseout", function() {
      // Clear the currently hovered node
      currentlyHoveredNode = null;
      
      // Reset all classes instead of opacity
      node.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false);
      link.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false);
      labels.classed(styles["node-to-hide"], false)
          .classed(styles["irrelevant-node"], false);
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
    });

    /**
     * Implements keyboard interactions:
     * - Escape key: Restores all hidden nodes (kept as backup)
     * - Command/Control key: Activates Command/Control+hover effect during hover
     */
    
    // Track command/control key state
    let isCommandKeyPressed = false;
    
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
              .classed(styles["irrelevant-node"], false);
          link.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false);
          labels.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false);
          
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
              .classed(styles["irrelevant-node"], false);
          link.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false);
          labels.classed(styles["node-to-hide"], false)
              .classed(styles["irrelevant-node"], false);
          
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
     * LABELS CREATION & STYLING
     ****************************/
    /**
     * Creates text labels for each node.
     * Labels show the node name and move with the node.
     */
    const labels = g.append("g")
      .attr("class", styles["labels"])
      .selectAll("text")
      .data(graphData.nodes)
      .enter().append("text")
      .each(function(d) {
        // Apply styling class
        d3.select(this).classed(styles.label, true);
        
        // Apply tag classes directly (not through styles module)
        if (d.tags) {
          d.tags.forEach(tag => {
            d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
          });
        }
      })
      .attr("text-anchor", "middle") // Center the text horizontally
      .style("font-size", 13)
      .text(d => d.name);

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
      d.x = width / 2 + radius * Math.cos(angle);
      d.y = height / 2 + radius * Math.sin(angle);
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
      .alphaDecay(0.00008)
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
      // Update node positions
      node.attr("cx", d => d.x || 0)
          .attr("cy", d => d.y || 0);

      // Update link positions to connect nodes
      link
        .attr("x1", d => (d.source as SimulationNode).x)
        .attr("y1", d => (d.source as SimulationNode).y)
        .attr("x2", d => (d.target as SimulationNode).x)
        .attr("y2", d => (d.target as SimulationNode).y);

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
  }, [graphData, width, height]);

  return (
    <div className={styles["network-topology-container"]}>
      <TopologyToolHints />
      <svg ref={svgRef} width="100%" height="100%" className={styles["network-topology-svg"]}></svg>
    </div>
  );
};

export default NetworkTopology; 