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
      
      // Parse the name to separate title and fileCount
      const textElement = d3.select(this);
      const fullName = d.name;
      
      // Check if the name contains HTML span for fileCount
      if (fullName.includes('<span') && fullName.includes('</span>')) {
        // Extract the parts using regex
        const match = fullName.match(/^(.*?)\s*<span[^>]*>\((\d+)\)<\/span>$/);
        if (match) {
          const [, title, fileCount] = match;
          
          // Add main title
          textElement.append('tspan')
            .text(title);
          
          // Add fileCount with different color
          textElement.append('tspan')
            .style('fill', 'var(--color-sec)')
            .text(` (${fileCount})`);
        } else {
          // Fallback: just use the full name as text
          textElement.text(fullName);
        }
      } else {
        // No HTML content, just use the name directly
        textElement.text(fullName);
      }
    })
    .attr('text-anchor', 'middle')
    .style('font-size', 13);
} 