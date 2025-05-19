import React, { useState } from 'react';
import NetworkTopology from './NetworkTopology';
import './TopologyExample.module.scss';

// Custom data example
const customData = {
  nodes: [
    { id: "Design System", group: 1, size: 6 },
    { id: "Components", group: 4, size: 4 },
    { id: "Utilities", group: 7, size: 4 },
    { id: "Typography", group: 10, size: 4 },
    { id: "Colors", group: 15, size: 4 },
    { id: "Icons", group: 19, size: 4 },
    { id: "Button", group: 4, size: 3 },
    { id: "Input", group: 4, size: 3 },
    { id: "Card", group: 4, size: 3 },
    { id: "Modal", group: 4, size: 3 },
    { id: "Navigation", group: 4, size: 3 },
    { id: "Dropdown", group: 4, size: 3 },
    { id: "Layout", group: 7, size: 3 },
    { id: "Spacing", group: 7, size: 3 },
    { id: "Responsive", group: 7, size: 3 },
    { id: "Animation", group: 7, size: 3 },
    { id: "Headings", group: 10, size: 3 },
    { id: "Body Text", group: 10, size: 3 },
    { id: "Labels", group: 10, size: 3 },
    { id: "Primary", group: 15, size: 3 },
    { id: "Secondary", group: 15, size: 3 },
    { id: "Accent", group: 15, size: 3 },
    { id: "UI Icons", group: 19, size: 3 },
    { id: "Social Icons", group: 19, size: 3 },
  ],
  links: [
    { source: "Design System", target: "Components" },
    { source: "Design System", target: "Utilities" },
    { source: "Design System", target: "Typography" },
    { source: "Design System", target: "Colors" },
    { source: "Design System", target: "Icons" },
    { source: "Components", target: "Button" },
    { source: "Components", target: "Input" },
    { source: "Components", target: "Card" },
    { source: "Components", target: "Modal" },
    { source: "Components", target: "Navigation" },
    { source: "Components", target: "Dropdown" },
    { source: "Utilities", target: "Layout" },
    { source: "Utilities", target: "Spacing" },
    { source: "Utilities", target: "Responsive" },
    { source: "Utilities", target: "Animation" },
    { source: "Typography", target: "Headings" },
    { source: "Typography", target: "Body Text" },
    { source: "Typography", target: "Labels" },
    { source: "Colors", target: "Primary" },
    { source: "Colors", target: "Secondary" },
    { source: "Colors", target: "Accent" },
    { source: "Icons", target: "UI Icons" },
    { source: "Icons", target: "Social Icons" },
  ],
};

const TopologyExample: React.FC = () => {
  const [useCustomData] = useState(false);
  
  return (
    <div className="topology-example">      
      <div className="topology-container">
        <NetworkTopology data={useCustomData ? customData : undefined} />
      </div>
    </div>
  );
};

export default TopologyExample; 