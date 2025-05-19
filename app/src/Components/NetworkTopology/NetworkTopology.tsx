import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NodeShape } from '../Tree/TreeExplorer';
import { PageType } from '../../ObjectShapes/PageShape';
import { transformTreeToGraph } from '../../Utils/TreeToGraphTransformer';
import { Example_TreeNodeMaps } from '../../ObjectShapes/ExampleData/Example_TreeNodes';
import { transformTreeNodes } from '../Tree/TreeExplorer';

export const baseNodeSize = 10;
export const sizeFactor = 2.4;
export const sizePower = 1.1;

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
const defaultData = transformTreeToGraph(transformTreeNodes(Example_TreeNodeMaps.Math));

const NetworkTopology = ({ 
  data = defaultData, 
  width = 800, 
  height = 600, 
  treeData 
}: NetworkTopologyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Convert tree data to graph data if provided
  const graphData = treeData ? transformTreeToGraph(treeData) : data;

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing visualization
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const nodeRadius = 20;
    
    // Create a container group for all graph elements
    // This allows us to transform (zoom/pan) all elements together
    const g = svg.append("g")
      .attr("class", styles["graph-container"]);
    
    // Use a valid color scheme from d3 v4
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    /**
     * ZOOM AND PAN FUNCTIONALITY
     * 
     * D3's zoom behavior handles both:
     * 1. Mouse wheel zooming
     * 2. Touch-based panning (e.g., two-finger drag on touch devices)
     * 3. Mouse drag panning
     * 
     * Key components:
     * - scaleExtent: Sets the minimum and maximum zoom levels
     * - on("zoom"): Event handler applies transforms to the container group
     * - The transform contains:
     *   - x, y: The pan translation coordinates
     *   - k: The zoom scale factor
     */
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      // Restrict zoom levels between minZoom and maxZoom
      .scaleExtent([minZoom, maxZoom])
      // When zoom or pan events occur, transform the container group
      .on("zoom", (event) => {
        // event.transform contains x, y (translation) and k (scale)
        // Apply the transformation to the container group
        g.attr("transform", event.transform);
      });
    
    // Apply zoom behavior to the SVG element
    // This enables the following interactions:
    // - Mouse wheel: Zoom in/out
    // - Mouse drag: Pan the visualization
    // - Touch with two fingers: Pan the visualization
    // - Pinch gesture: Zoom in/out
    svg.call(zoom);
    
    // Add double-click handler to reset zoom level
    // When users double-click, the visualization transitions back to the initial state
    svg.on("dblclick.zoom", () => {
      svg.transition()
        .duration(750) // Animation duration in milliseconds
        .call(zoom.transform, d3.zoomIdentity); // Reset to identity transform (no zoom, no pan)
    });

    // Create the simulation
    const simulation = d3.forceSimulation<SimulationNode>()
      .force("link", d3.forceLink<SimulationNode, SimulationLink>()
        .id(d => d.id)
        .distance(80))
      .force("charge", d3.forceManyBody().strength(repulsionStrength))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide()
        .radius(() => nodeRadius + 0.5)
        .iterations(4))
      .velocityDecay(velocityDecay); // Apply velocity decay to control node movement speed

    // Create links
    const link = g.append("g")
      .attr("class", styles.links)
      .selectAll("line")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", styles.link);

    // Create nodes
    const node = g.append("g")
      .attr("class", styles.nodes)
      .selectAll("circle")
      .data(graphData.nodes as SimulationNode[])
      .enter().append("circle")
      .attr("class", styles.node)
      .attr("r", d => d.size * 2)
      .style("fill", d => color(d.group?.toString() || ""));

    // Setup drag behavior for SVG circles
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

    // Add tooltips
    node.append("title")
      .text(d => d.id);

    // Add labels
    const labels = g.append("g")
      .attr("class", styles.labels)
      .selectAll("text")
      .data(graphData.nodes)
      .enter().append("text")
      .attr("text-anchor", "middle") // Center the text horizontally
      .style("font-size", 13)
      .text(d => d.name);

    // Set initial positions to prevent extreme layouts
    graphData.nodes.forEach((d, i) => {
      const angle = (i / graphData.nodes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.3;
      d.x = width / 2 + radius * Math.cos(angle);
      d.y = height / 2 + radius * Math.sin(angle);
    });

    // Set up simulation
    simulation.nodes(graphData.nodes as SimulationNode[])
      .on("tick", ticked)
      .alpha(1)
      .alphaDecay(0.00008)
      .alphaMin(0.000001);

    const linkForce = simulation.force("link") as d3.ForceLink<SimulationNode, SimulationLink>;
    if (linkForce) {
      linkForce.links(graphData.links as SimulationLink[]);
    }

    // Tick function without boundary constraints
    function ticked() {
      // Update node positions without constraints
      node.attr("cx", d => d.x || 0)
          .attr("cy", d => d.y || 0);

      // Update link positions
      link
        .attr("x1", d => (d.source as SimulationNode).x)
        .attr("y1", d => (d.source as SimulationNode).y)
        .attr("x2", d => (d.target as SimulationNode).x)
        .attr("y2", d => (d.target as SimulationNode).y);

      // Update label positions - position below node with 8px gap
      labels
        .attr("x", d => d.x || 0)
        .attr("y", d => {
          const nodeRadius = d.size * 2;
          return (d.y || 0) + nodeRadius + 14; // Position below node with 8px gap
        });
    }

    // Add resize handler
    const resizeObserver = new ResizeObserver(() => {
      const svgElement = svgRef.current;
      if (!svgElement || !svgElement.parentElement) return;
      
      const containerWidth = svgElement.parentElement.clientWidth;
      // Use full available height instead of constraining by aspect ratio
      const containerHeight = svgElement.parentElement.clientHeight || 600;
      
      svg.attr('width', containerWidth)
         .attr('height', containerHeight);
         
      simulation.force('center', d3.forceCenter(containerWidth / 2, containerHeight / 2));
      
      // Restart with a gentle alpha to avoid dramatic reorganization
      simulation.alpha(0.1).restart();
    });

    if (svgRef.current.parentElement) {
      resizeObserver.observe(svgRef.current.parentElement);
    }

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