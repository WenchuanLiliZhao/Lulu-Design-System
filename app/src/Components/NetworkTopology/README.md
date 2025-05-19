# Network Topology Component

A React component for visualizing network/graph data using D3.js.

## Features

- Interactive force-directed graph visualization
- Customizable node colors and sizes
- Draggable nodes for better exploration
- Responsive design with automatic resizing
- Node tooltips for additional information

## Usage

```tsx
import NetworkTopology from './Components/NetworkTopology/NetworkTopology';

// Example custom data (optional - component has default data)
const myGraphData = {
  nodes: [
    { id: "Node A", group: 1, size: 6 },
    { id: "Node B", group: 2, size: 4 },
    { id: "Node C", group: 3, size: 3 },
    // ...more nodes
  ],
  links: [
    { source: "Node A", target: "Node B" },
    { source: "Node A", target: "Node C" },
    // ...more links
  ]
};

// Basic usage with default data
function BasicExample() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <NetworkTopology />
    </div>
  );
}

// Custom data example
function CustomDataExample() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <NetworkTopology 
        data={myGraphData}
        width={800}
        height={600}
      />
    </div>
  );
}
```

## Props

| Prop    | Type   | Default | Description                                     |
|---------|--------|----------|-------------------------------------------------|
| data    | Object | *Built-in example data* | Graph data with nodes and links |
| width   | number | 800      | Initial width of the SVG (will auto-resize if container changes) |
| height  | number | 600      | Initial height of the SVG (will auto-resize if container changes) |

### Data Structure

The `data` prop expects an object with the following structure:

```typescript
interface Node {
  id: string;      // Unique identifier for the node
  group: number;   // Group number (affects node color)
  size: number;    // Size multiplier (node radius)
}

interface Link {
  source: string;  // ID of source node
  target: string;  // ID of target node
}

interface Data {
  nodes: Node[];
  links: Link[];
}
```

## Notes

- The component requires d3.js as a dependency
- Container element should have explicit height for proper rendering
- Component uses ResizeObserver for responsive behavior 