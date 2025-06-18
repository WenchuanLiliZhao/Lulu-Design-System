import * as d3 from 'd3';
import { SimulationNode } from '../NetworkTopology';
import styles from '../NetworkTopology.module.scss';
import { NodeTagPrefix } from '../TagFilterTree';

interface CreateCircleParams {
  graphData: { nodes: SimulationNode[] };
  color: d3.ScaleOrdinal<string, string>;
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export function createCircles({ graphData, color, g }: CreateCircleParams) {
  // Create a group for each node that will contain both the main node and focus ring
  const nodeGroups = g.append('g')
    .attr('class', styles.nodes)
    .selectAll('g')
    .data(graphData.nodes)
    .enter().append('g')
    .attr('class', 'node-group');

  // Create the focus ring (outer circle) for each node
  const focusRings = nodeGroups.append('circle')
    .attr('class', 'focus-ring')
    .attr('r', d => d.size * 2 + 3) // radius + 3 pixels as requested
    .style('stroke', d => color(d.group?.toString() || ''))
    .style('fill', 'none')
    .style('stroke-width', 2)
    .style('opacity', 0) // Initially hidden
    .style('pointer-events', 'none'); // Don't interfere with node interactions

  // Create the main node circles
  const nodes = nodeGroups.append('circle')
    .each(function(d) {
      // Apply the styling class
      d3.select(this).classed(styles.node, true);
      
      // Apply tag classes directly (not through styles module)
      if (d.tags) {
        d.tags.forEach((tag: string) => {
          d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
        });
      }
    })
    .attr('r', d => d.size * 2)
    .style('fill', d => color(d.group?.toString() || ''));

  return {
    nodeGroups,
    nodes,
    focusRings
  };
} 