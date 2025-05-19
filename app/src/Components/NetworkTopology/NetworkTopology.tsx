import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { NodeShape } from '../Tree/TreeExplorer';
import { PageType } from '../../ObjectShapes/PageShape';
import { transformTreeToGraph } from '../../Utils/TreeToGraphTransformer';
import { Example_TreeNodeMaps } from '../../ObjectShapes/ExampleData/Example_TreeNodes';
import { transformTreeNodes } from '../Tree/TreeExplorer';

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
    
    // Use a valid color scheme from d3 v4
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the simulation
    const simulation = d3.forceSimulation<SimulationNode>()
      .force("link", d3.forceLink<SimulationNode, SimulationLink>()
        .id(d => d.id)
        .distance(80))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide()
        .radius(() => nodeRadius + 0.5)
        .iterations(4));

    // Create links
    const link = svg.append("g")
      .attr("class", styles.links)
      .selectAll("line")
      .data(graphData.links)
      .enter().append("line")
      .attr("class", styles.link);

    // Create nodes
    const node = svg.append("g")
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
    const labels = svg.append("g")
      .attr("class", styles.labels)
      .selectAll("text")
      .data(graphData.nodes)
      .enter().append("text")
      .attr("dx", 12)
      .attr("dy", ".5em")
      .style("font-size", 13)
      .text(d => d.id);

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
      .alphaDecay(0.02)
      .alphaMin(0.001);

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

      // Update label positions
      labels
        .attr("x", d => d.x || 0)
        .attr("y", d => d.y || 0);
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