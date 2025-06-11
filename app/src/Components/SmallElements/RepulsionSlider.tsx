import React, { useState, useCallback } from 'react';
import styles from './RepulsionSlider.module.scss';

interface RepulsionSliderProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
}

export const RepulsionSlider: React.FC<RepulsionSliderProps> = ({
  initialValue = -150,
  minValue = -500,
  maxValue = -50,
  step = 10,
  onChange,
  label = "Node Repulsion"
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);

  // 计算滑块的百分比位置
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <div className={styles['repulsion-slider']}>
      <div className={styles['slider-header']}>
        <span className={styles['label']}>{label}</span>
        <span className={styles['value']}>{value}</span>
      </div>
      <div className={styles['slider-container']}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={value}
          onChange={handleChange}
          className={styles['slider-input']}
          aria-label={`${label} slider, current value: ${value}`}
        />
        <div 
          className={styles['slider-track']}
          style={{ '--slider-percentage': `${percentage}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}; 