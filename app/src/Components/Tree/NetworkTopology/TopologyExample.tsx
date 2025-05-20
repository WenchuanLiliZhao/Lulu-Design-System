import React from 'react';
import NetworkTopology from './NetworkTopology';
import { nodeTagMerge } from '../../../Utils/nodeTagMerge';
import { Example_TreeNodeMaps } from '../../../ObjectShapes/ExampleData/Example_TreeNodes';

// Custom data example

const TopologyExample: React.FC = () => {

  nodeTagMerge(Example_TreeNodeMaps.Math)

  console.log("🤖", nodeTagMerge(Example_TreeNodeMaps.Math))

  return (
    <NetworkTopology />
  );
};

export default TopologyExample; 