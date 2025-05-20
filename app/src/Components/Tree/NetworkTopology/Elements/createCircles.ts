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
  return g.append('g')
    .attr('class', styles.nodes)
    .selectAll('circle')
    .data(graphData.nodes)
    .enter().append('circle')
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
} 