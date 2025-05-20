import * as d3 from 'd3';
import { GraphNodeShape } from '../NetworkTopology';
import styles from '../NetworkTopology.module.scss';
import { NodeTagPrefix } from '../TagFilterTree';

interface CreateLabelsParams {
  graphData: { nodes: GraphNodeShape[] };
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export function createLabels({ graphData, g }: CreateLabelsParams) {
  return g.append('g')
    .attr('class', styles['labels'])
    .selectAll('text')
    .data(graphData.nodes)
    .enter().append('text')
    .each(function(d) {
      d3.select(this).classed(styles.label, true);
      if (d.tags) {
        d.tags.forEach(tag => {
          d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
        });
      }
    })
    .attr('text-anchor', 'middle')
    .style('font-size', 13)
    .text(d => d.name);
} 