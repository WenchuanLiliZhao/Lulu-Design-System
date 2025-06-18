import React, { useState, useEffect, useCallback } from "react";
import NetworkTopology, { TopologyDataShape } from "./NetworkTopology";
import {
  TopologyParaSliderCompact,
  TopologyParameters,
} from "../../SmallElements/TopologyParaSlider";
import { Dropdown } from "../../Dropdown/Dropdown";
import { Btn } from "../../SmallElements/Btn";
import { NodeShape } from "../TreeExplorer";
import styles from "./TopologyWithParameterControls.module.scss";
import { Menu } from "../../Dropdown/Menu";

interface TopologyWithParameterControlsProps {
  data?: TopologyDataShape;
  width?: number;
  height?: number;
  treeData?: NodeShape[];
}

// 默认参数配置
const DEFAULT_PARAMETERS: TopologyParameters = {
  repulsionStrength: -150,
  linkDistance: 80,
  velocityDecay: 0.2,
  nodeRadius: 20,
  initialZoomLevel: 0.8,
  alphaDecay: 0.00008,
  collideRadius: 0.5,
  dynamicLinkFactor: 0.3,
};

// localStorage 的 key
const STORAGE_KEY = "topology-parameters";

export const TopologyWithParameterControls: React.FC<
  TopologyWithParameterControlsProps
> = ({ data, width = 800, height = 600, treeData }) => {
  // 从 localStorage 加载参数，如果没有则使用默认值
  const [parameters, setParameters] = useState<TopologyParameters>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedParameters = JSON.parse(stored);
        // 确保所有必需的参数都存在，如果缺少则用默认值补充
        return {
          ...DEFAULT_PARAMETERS,
          ...parsedParameters,
        };
      }
    } catch (error) {
      console.warn("Failed to load topology parameters from localStorage:", error);
    }
    return DEFAULT_PARAMETERS;
  });

  // 当参数改变时保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parameters));
    } catch (error) {
      console.warn("Failed to save topology parameters to localStorage:", error);
    }
  }, [parameters]);

  const handleParametersChange = useCallback((newParameters: TopologyParameters) => {
    setParameters(newParameters);
  }, []);

  // 恢复默认设置
  const handleResetToDefaults = useCallback(() => {
    setParameters(DEFAULT_PARAMETERS);
  }, []);

  return (
    <div className={styles["topology-with-controls"]}>
      <div className={styles["dropdown-controls"]}>
        <Dropdown
          trigger={
            <Btn icon="settings" size="size-medium" mode="mode-plain" />
          }
          dropdownContent={
            <Menu
              group={[
                {
                  groupItems: [
                    <TopologyParaSliderCompact
                      key="slider"
                      initialValues={parameters}
                      onChange={handleParametersChange}
                    />,
                    <Btn 
                      key="reset-btn"
                      icon={"refresh"} 
                      text={"使用默认设置"} 
                      mode={"mode-possitive-filled"} 
                      size={"size-medium"} 
                      onClick={handleResetToDefaults}
                    />
                  ],
                },
              ]}
            />
          }
          dropdownSize="medium"
          position="left"
        />
      </div>
      <div className={styles["topology-container"]}>
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
