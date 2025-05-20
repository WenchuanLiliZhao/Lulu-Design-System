import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { mergeTagsOfTreeNodes, NodeShape } from '../TreeExplorer';
import { PageType } from '../../../ObjectShapes/PageShape';
import { transformTreeToGraph } from '../../../Utils/TreeToGraphTransformer';
import { Example_TreeNodeMaps } from '../../../ObjectShapes/ExampleData/Example_TreeNodes';
import { transformTreeNodes } from '../TreeExplorer';
import { NodeTagPrefix } from "./TagFilterTree";

export const initialZoomLevel = 0.8;
export const baseNodeSize = 10;
export const sizeFactor = 2.4;
export const sizePower = 1.1;
export const secondaryNodeOpacity = 0.24;
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
    
    /****************************
     * ZOOM AND PAN FUNCTIONALITY
     ****************************/
    /**
     * D3's zoom behavior handles:
     * 1. Mouse wheel zooming
     * 2. Touch-based panning (two-finger drag)
     * 3. Mouse drag panning
     * 
     * Configuration:
     * - scaleExtent: Sets min/max zoom levels
     * - on("zoom"): Applies transforms to the container
     */
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      // Restrict zoom levels between minZoom and maxZoom
      .scaleExtent([minZoom, maxZoom])
      // When zoom or pan events occur, transform the container group
      .on("zoom", (event) => {
        // Apply the transformation to the container group
        g.attr("transform", event.transform);
      });
    
    // Apply zoom behavior to the SVG element
    svg.call(zoom);
    
    // Set initial zoom level centered on the SVG
    const svgWidth = svg.node()?.getBoundingClientRect().width || width;
    const svgHeight = svg.node()?.getBoundingClientRect().height || height;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    
    // Use translate-scale-translate pattern to zoom from center
    const initialTransform = d3.zoomIdentity
      .translate(centerX, centerY)
      .scale(initialZoomLevel)
      .translate(-centerX, -centerY);
      
    svg.call(zoom.transform, initialTransform);
    
    // Add double-click handler to reset zoom level
    svg.on("dblclick.zoom", () => {
      // Recalculate center in case the SVG has been resized
      const currentWidth = svg.node()?.getBoundingClientRect().width || width;
      const currentHeight = svg.node()?.getBoundingClientRect().height || height;
      const currentCenterX = currentWidth / 2;
      const currentCenterY = currentHeight / 2;
      
      const resetTransform = d3.zoomIdentity
        .translate(currentCenterX, currentCenterY)
        .scale(initialZoomLevel)
        .translate(-currentCenterX, -currentCenterY);
        
      svg.transition()
        .duration(750) // Animation duration in milliseconds
        .call(zoom.transform, resetTransform); // Reset to initial zoom level centered
    });

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
     * Implements hover interaction that highlights connected nodes.
     * When hovering over a node:
     * - The hovered node and its direct connections stay at full opacity
     * - All other nodes and links become semi-transparent
     */
    node.on("mouseover", function(_event, d) {
      // Find connected nodes (neighbors)
      const connectedNodeIds = new Set<string>();
      connectedNodeIds.add(d.id);
      
      // Add all directly connected nodes
      graphData.links.forEach(link => {
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as GraphNodeShape).id;
        const targetId = typeof link.target === 'string' ? link.target : (link.target as GraphNodeShape).id;
        
        if (sourceId === d.id) connectedNodeIds.add(targetId);
        if (targetId === d.id) connectedNodeIds.add(sourceId);
      });
      
      // Apply opacity to nodes
      node.style("opacity", n => connectedNodeIds.has(n.id) ? 1 : secondaryNodeOpacity);
      
      // Apply opacity to links
      link.style("opacity", l => {
        const sourceId = typeof l.source === 'string' ? l.source : (l.source as GraphNodeShape).id;
        const targetId = typeof l.target === 'string' ? l.target : (l.target as GraphNodeShape).id;
        return connectedNodeIds.has(sourceId) && connectedNodeIds.has(targetId) ? 1 : secondaryNodeOpacity;
      });
      
      // Apply opacity to labels
      labels.style("opacity", n => connectedNodeIds.has(n.id) ? 1 : secondaryNodeOpacity);
    })
    .on("mouseout", function() {
      // Reset all opacities
      node.style("opacity", 1);
      link.style("opacity", 1);
      labels.style("opacity", 1);
    });

    // Add tooltips
    node.append("title")
      .text(d => d.id);

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
      resizeObserver.disconnect();
      simulation.stop();
    };
  }, [graphData, width, height]);

  return (
    <div className={styles["network-topology-container"]}>
      <svg ref={svgRef} width="100%" height="100%" className={styles["network-topology-svg"]}></svg>
    </div>
  );
};

export default NetworkTopology; 