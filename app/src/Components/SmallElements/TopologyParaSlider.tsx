import React, { useState, useCallback } from 'react';
import styles from './TopologyParaSlider.module.scss';

export interface TopologyParameters {
  repulsionStrength: number;
  linkDistance: number;
  velocityDecay: number;
  nodeRadius: number;
  initialZoomLevel: number;
  alphaDecay: number;
  collideRadius: number;
  dynamicLinkFactor: number;
}

interface SliderConfig {
  key: keyof TopologyParameters;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description: string;
}

interface TopologyParaSliderProps {
  initialValues?: Partial<TopologyParameters>;
  onChange: (parameters: TopologyParameters) => void;
}

const sliderConfigs: SliderConfig[] = [
  {
    key: 'repulsionStrength',
    label: '节点排斥力',
    min: -800,
    max: -20,
    step: 10,
    defaultValue: -150,
    description: '控制节点之间的排斥强度，值越小排斥越强'
  },
  {
    key: 'linkDistance',
    label: '连接距离',
    min: 20,
    max: 200,
    step: 5,
    defaultValue: 80,
    description: '控制连接节点之间的理想距离'
  },
  {
    key: 'velocityDecay',
    label: '速度衰减',
    min: 0.1,
    max: 0.9,
    step: 0.05,
    defaultValue: 0.2,
    description: '控制节点运动的阻尼，值越小节点移动越活跃'
  },
  {
    key: 'nodeRadius',
    label: '节点半径',
    min: 5,
    max: 50,
    step: 1,
    defaultValue: 20,
    description: '控制节点的显示大小和碰撞半径'
  },
  {
    key: 'initialZoomLevel',
    label: '初始缩放',
    min: 0.1,
    max: 2.0,
    step: 0.1,
    defaultValue: 0.8,
    description: '控制图表的初始缩放级别'
  },
  {
    key: 'alphaDecay',
    label: '仿真衰减',
    min: 0.00001,
    max: 0.01,
    step: 0.00005,
    defaultValue: 0.00008,
    description: '控制仿真冷却速度，值越小仿真运行越久'
  },
  {
    key: 'collideRadius',
    label: '碰撞半径',
    min: 0,
    max: 30,
    step: 0.5,
    defaultValue: 0.5,
    description: '控制节点碰撞检测的额外半径'
  },
  {
    key: 'dynamicLinkFactor',
    label: '动态链接系数',
    min: 0,
    max: 1.0,
    step: 0.05,
    defaultValue: 0.3,
    description: '根据节点连接数动态调整链接长度的系数，值越大高连接度节点的链接越长'
  }
];

export const TopologyParaSlider: React.FC<TopologyParaSliderProps> = ({
  initialValues = {},
  onChange
}) => {
  // Initialize parameters with default values
  const defaultParameters: TopologyParameters = sliderConfigs.reduce((acc, config) => {
    acc[config.key] = initialValues[config.key] ?? config.defaultValue;
    return acc;
  }, {} as TopologyParameters);

  const [parameters, setParameters] = useState<TopologyParameters>(defaultParameters);

  const handleSliderChange = useCallback((key: keyof TopologyParameters, value: number) => {
    const newParameters = { ...parameters, [key]: value };
    setParameters(newParameters);
    onChange(newParameters);
  }, [parameters, onChange]);

  const formatValue = (value: number, step: number): string => {
    if (step < 1) {
      const decimals = step.toString().split('.')[1]?.length || 0;
      return value.toFixed(decimals);
    }
    return value.toString();
  };

  const calculatePercentage = (value: number, min: number, max: number): number => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <div className={styles['repulsion-slider-container']}>
      <div className={styles['sliders-grid']}>
        {sliderConfigs.map((config) => {
          const value = parameters[config.key];
          const percentage = calculatePercentage(value, config.min, config.max);
          
          return (
            <div key={config.key} className={styles['repulsion-slider']} title={config.description}>
              <div className={styles['slider-header']}>
                <span className={styles['label']}>{config.label}</span>
                <span className={styles['value']}>{formatValue(value, config.step)}</span>
              </div>
              <div className={styles['slider-container']}>
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={value}
                  onChange={(e) => handleSliderChange(config.key, parseFloat(e.target.value))}
                  className={styles['slider-input']}
                  aria-label={`${config.label} slider, current value: ${formatValue(value, config.step)}`}
                />
                <div 
                  className={styles['slider-track']}
                  style={{ '--slider-percentage': `${percentage}%` } as React.CSSProperties}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 