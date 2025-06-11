import React, { useState } from 'react';
import NetworkTopology, { TopologyDataShape } from './NetworkTopology';
import { RepulsionSlider } from '../../SmallElements/RepulsionSlider';
import { NodeShape } from '../TreeExplorer';
import styles from './TopologyWithControls.module.scss';

interface TopologyWithControlsProps {
  data?: TopologyDataShape;
  width?: number;
  height?: number;
  treeData?: NodeShape[];
}

export const TopologyWithControls: React.FC<TopologyWithControlsProps> = ({
  data,
  width = 800,
  height = 600,
  treeData
}) => {
  const [repulsionStrength, setRepulsionStrength] = useState(-150);

  const handleRepulsionChange = (newValue: number) => {
    setRepulsionStrength(newValue);
  };

  return (
    <div className={styles['topology-with-controls']}>
      <div className={styles['controls-panel']}>
        <RepulsionSlider 
          initialValue={-150}
          minValue={-500}
          maxValue={-50}
          step={10}
          onChange={handleRepulsionChange}
          label="节点排斥力"
        />
      </div>
      <div className={styles['topology-container']}>
        <NetworkTopology
          data={data}
          width={width}
          height={height}
          treeData={treeData}
          repulsionStrength={repulsionStrength}
        />
      </div>
    </div>
  );
}; 