import * as d3 from 'd3';
import { GraphLinkShape, GraphNodeShape } from '../NetworkTopology';
import styles from '../NetworkTopology.module.scss';
import { NodeTagPrefix } from '../TagFilterTree';

interface CreateLinesParams {
  graphData: { links: GraphLinkShape[]; nodes: GraphNodeShape[] };
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
}

export function createLines({ graphData, g }: CreateLinesParams) {
  return g.append('g')
    .attr('class', styles.links)
    .selectAll('line')
    .data(graphData.links)
    .enter().append('line')
    .each(function(d) {
      const sourceNode = typeof d.source === 'string' 
        ? graphData.nodes.find(n => n.id === d.source) 
        : d.source as GraphNodeShape;
      
      const targetNode = typeof d.target === 'string'
        ? graphData.nodes.find(n => n.id === d.target)
        : d.target as GraphNodeShape;

      const sourceTags = sourceNode?.tags || [];
      const targetTags = targetNode?.tags || [];
      
      d3.select(this).classed(styles.link, true);
      
      sourceTags.forEach(tag => {
        d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
      });
      
      targetTags.forEach(tag => {
        d3.select(this).classed(`${NodeTagPrefix}-${tag}`, true);
      });
    });
} 