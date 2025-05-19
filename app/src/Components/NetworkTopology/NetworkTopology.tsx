import styles from './NetworkTopology.module.scss';
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  group: number;
  size: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  index?: number;
}

interface SimulationNode extends Node {
  x: number;
  y: number;
}

interface SimulationLink extends Link {
  source: SimulationNode;
  target: SimulationNode;
}

interface NetworkTopologyProps {
  data?: {
    nodes: Node[];
    links: Link[];
  };
  width?: number;
  height?: number;
}

const defaultData = {
  nodes: [
    { id: "Machine Learning", group: 1, size: 6 },
    { id: "Supervised Learning", group: 4, size: 4 },
    { id: "Unsupervised Learning", group: 7, size: 4 },
    { id: "Reinforcement Learning", group: 10, size: 4 },
    { id: "Dimensionality Reduction", group: 15, size: 4 },
    { id: "Ensemble Learning", group: 19, size: 4 },
    { id: "Independent Component Analysis", group: 14, size: 2 },
    { id: "Linear Discriminant Analysis", group: 14, size: 2 },
    { id: "Principal Component Analysis", group: 14, size: 2 },
    { id: "Factor Analysis", group: 14, size: 2 },
    { id: "Feature Extraction", group: 14, size: 2 },
    { id: "Feature Selection", group: 14, size: 2 },
    { id: "Partial Least Squares Regression", group: 14, size: 2 },
    { id: "AdaBoost", group: 18, size: 2 },
    { id: "Boosting", group: 18, size: 2 },
    { id: "Gradient Boosted Decision Tree", group: 18, size: 2 },
    { id: "Gradient Boosting Machine", group: 18, size: 2 },
    { id: "Q-learning", group: 10, size: 2 },
    { id: "State–action–reward–state–action", group: 10, size: 2 },
    { id: "Temporal Difference Learning", group: 10, size: 2 },
    { id: "Learning Automata", group: 10, size: 2 },
    { id: "Gaussian Process Regression", group: 3, size: 2 },
    { id: "Artificial Neural Network", group: 3, size: 2 },
    { id: "Logistic Model Tree", group: 3, size: 2 },
    { id: "Support Vector Machines", group: 3, size: 2 },
    { id: "Random Forests", group: 3, size: 2 },
    { id: "k-Nearest Neighbor", group: 3, size: 2 },
    { id: "Naive Bayes", group: 3, size: 2 },
    { id: "Hidden Markov Models", group: 3, size: 2 },
    { id: "K-means Algorithm", group: 6, size: 2 },
    { id: "Mixture Models", group: 6, size: 2 },
    { id: "Hierarchical Clustering", group: 6, size: 2 },
    { id: "Neural Networks", group: 6, size: 2 },
    { id: "Method of Moments", group: 6, size: 2 },
  ],
  links: [
    { source: "Machine Learning", target: "Supervised Learning" },
    { source: "Machine Learning", target: "Reinforcement Learning" },
    { source: "Machine Learning", target: "Unsupervised Learning" },
    { source: "Machine Learning", target: "Reinforcement Learning" },
    { source: "Machine Learning", target: "Dimensionality Reduction" },
    { source: "Machine Learning", target: "Ensemble Learning" },
    {
      source: "Dimensionality Reduction",
      target: "Independent Component Analysis",
    },
    {
      source: "Dimensionality Reduction",
      target: "Linear Discriminant Analysis",
    },
    {
      source: "Dimensionality Reduction",
      target: "Principal Component Analysis",
    },
    { source: "Dimensionality Reduction", target: "Factor Analysis" },
    { source: "Dimensionality Reduction", target: "Feature Extraction" },
    { source: "Dimensionality Reduction", target: "Feature Selection" },
    {
      source: "Dimensionality Reduction",
      target: "Partial Least Squares Regression",
    },
    { source: "Ensemble Learning", target: "AdaBoost" },
    { source: "Ensemble Learning", target: "Boosting" },
    {
      source: "Ensemble Learning",
      target: "Gradient Boosted Decision Tree",
    },
    { source: "Ensemble Learning", target: "Gradient Boosting Machine" },
    { source: "Reinforcement Learning", target: "Q-learning" },
    {
      source: "Reinforcement Learning",
      target: "State–action–reward–state–action",
    },
    {
      source: "Reinforcement Learning",
      target: "Temporal Difference Learning",
    },
    { source: "Reinforcement Learning", target: "Learning Automata" },
    {
      source: "Supervised Learning",
      target: "Gaussian Process Regression",
    },
    { source: "Supervised Learning", target: "Artificial Neural Network" },
    { source: "Supervised Learning", target: "Logistic Model Tree" },
    { source: "Supervised Learning", target: "Support Vector Machines" },
    { source: "Supervised Learning", target: "Random Forests" },
    { source: "Supervised Learning", target: "k-Nearest Neighbor" },
    { source: "Supervised Learning", target: "Naive Bayes" },
    { source: "Supervised Learning", target: "Hidden Markov Models" },
    { source: "Unsupervised Learning", target: "K-means Algorithm" },
    { source: "Unsupervised Learning", target: "Mixture Models" },
    { source: "Unsupervised Learning", target: "Hierarchical Clustering" },
    { source: "Unsupervised Learning", target: "Neural Networks" },
    { source: "Unsupervised Learning", target: "Method of Moments" },
  ],
};

const NetworkTopology = ({ data = defaultData, width = 800, height = 600 }: NetworkTopologyProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

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
      .data(data.links)
      .enter().append("line")
      .attr("class", styles.link);

    // Create nodes
    const node = svg.append("g")
      .attr("class", styles.nodes)
      .selectAll("circle")
      .data(data.nodes as SimulationNode[])
      .enter().append("circle")
      .attr("class", styles.node)
      .attr("r", d => d.size * 2)
      .style("fill", d => color(d.group.toString()));

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
      .on("end", (event) => {
        if (!event.active) simulation.alphaTarget(0);
        // Allow nodes to be placed anywhere (don't reset fx and fy)
        // This keeps nodes where the user drops them
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
      .data(data.nodes)
      .enter().append("text")
      .attr("dx", 12)
      .attr("dy", ".5em")
      .style("font-size", 13)
      .text(d => d.id);

    // Set initial positions to prevent extreme layouts
    data.nodes.forEach((d, i) => {
      const angle = (i / data.nodes.length) * 2 * Math.PI;
      const radius = Math.min(width, height) * 0.3;
      d.x = width / 2 + radius * Math.cos(angle);
      d.y = height / 2 + radius * Math.sin(angle);
    });

    // Set up simulation
    simulation.nodes(data.nodes as SimulationNode[])
      .on("tick", ticked)
      .alpha(1)
      .alphaDecay(0.02)
      .alphaMin(0.001);

    const linkForce = simulation.force("link") as d3.ForceLink<SimulationNode, SimulationLink>;
    if (linkForce) {
      linkForce.links(data.links as SimulationLink[]);
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
  }, [data, width, height]);

  return (
    <div className={styles["network-topology-container"]}>
      <svg ref={svgRef} width="100%" height="100%" className={styles["network-topology-svg"]}></svg>
    </div>
  );
};

export default NetworkTopology; 