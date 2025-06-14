import React, { useState } from 'react';
import NetworkTopology, { TopologyDataShape } from './NetworkTopology';
import { TopologyParaSlider, TopologyParameters } from '../../SmallElements/TopologyParaSlider';
import { NodeShape } from '../TreeExplorer';
import styles from './TopologyWithParameterControls.module.scss';

interface TopologyWithParameterControlsProps {
  data?: TopologyDataShape;
  width?: number;
  height?: number;
  treeData?: NodeShape[];
}

export const TopologyWithParameterControls: React.FC<TopologyWithParameterControlsProps> = ({
  data,
  width = 800,
  height = 600,
  treeData
}) => {
  const [parameters, setParameters] = useState<TopologyParameters>({
    repulsionStrength: -150,
    linkDistance: 80,
    velocityDecay: 0.2,
    nodeRadius: 20,
    initialZoomLevel: 0.8,
    alphaDecay: 0.00008,
    collideRadius: 0.5,
    dynamicLinkFactor: 0.3
  });

  const handleParametersChange = (newParameters: TopologyParameters) => {
    setParameters(newParameters);
  };

  return (
    <div className={styles['topology-with-controls']}>
      <div className={styles['controls-panel']}>
        <TopologyParaSlider 
          initialValues={parameters}
          onChange={handleParametersChange}
        />
      </div>
      <div className={styles['topology-container']}>
        <NetworkTopology
          data={data}
          width={width}
          height={height}
          treeData={treeData}
          repulsionStrength={parameters.repulsionStrength}
          linkDistance={parameters.linkDistance}
          velocityDecay={parameters.velocityDecay}
          nodeRadius={parameters.nodeRadius}
          initialZoomLevel={parameters.initialZoomLevel}
          alphaDecay={parameters.alphaDecay}
          collideRadius={parameters.collideRadius}
          dynamicLinkFactor={parameters.dynamicLinkFactor}
        />
      </div>
    </div>
  );
}; 