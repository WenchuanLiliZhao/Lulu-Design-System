import * as d3 from 'd3';

interface SvgZoomParams {
  svgElement: SVGSVGElement | null;
  width: number;
  height: number;
  initialZoomLevel: number;
  minZoom: number;
  maxZoom: number;
  onZoom: (transform: d3.ZoomTransform) => void;
}

export function svgZoom({
  svgElement,
  width,
  height,
  initialZoomLevel,
  minZoom,
  maxZoom,
  onZoom,
}: SvgZoomParams) {
  if (!svgElement) return { zoom: null };

  const svg = d3.select(svgElement);
  const centerX = width / 2;
  const centerY = height / 2;

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', (event) => {
      onZoom(event.transform);
    });

  svg.call(zoom);

  const initialTransform = d3.zoomIdentity
    .translate(centerX, centerY)
    .scale(initialZoomLevel)
    .translate(-centerX, -centerY);

  svg.call(zoom.transform, initialTransform);

  return { zoom };
} 