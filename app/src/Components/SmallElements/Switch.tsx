/* 
## Component Overview
- The `Switch` component is a React functional component designed to render a customizable toggle switch.
- It supports three sizes: "small", "medium", and "large".
- The component provides a callback function (`onChange`) to handle state changes when the switch is toggled.

### Key Implementation Challenges
- **Accessibility**: Includes an `aria-label` to ensure the component is accessible to screen readers.
- **Event Handling**: The `onChange` handler ensures seamless communication of the toggle state to parent components.

---

## 组件功能概览
- `Switch` 是一个 React 函数组件，用于渲染可自定义的开关按钮。
- 支持三种尺寸："small"、"medium" 和 "large"。
- 组件通过回调函数 (`onChange`) 处理开关状态的变化。

### 主要实现难点
- **无障碍性**：通过 `aria-label` 确保组件对屏幕阅读器的友好支持。
- **事件处理**：`onChange` 处理器确保开关状态能够无缝传递给父组件。
*/

import React, { useState } from "react";
import styles from "./Switch.module.scss";
import { Icon } from "../Icon";

interface SwitchProps {
  checked: boolean; // Indicates whether the switch is on or off
  // 指示开关是打开还是关闭
  size?: "small" | "medium" | "large"; // Defines the size of the switch
  // 定义开关的尺寸
  onChange: (checked: boolean) => void; // Callback function triggered when the switch state changes
  // 当开关状态改变时触发的回调函数
}

export const Switch: React.FC<SwitchProps> = ({ checked, size = "medium", onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = (newChecked: boolean) => {
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className={`${styles["switch"]} ${styles[size]}`}>
      {/* Render a hidden checkbox to manage the switch state */}
      {/* 渲染一个隐藏的复选框来管理开关状态 */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => handleToggle(e.target.checked)}
        aria-label="Toggle switch" // Provides an accessible label for screen readers
        // 为屏幕阅读器提供可访问的标签
      />
      {/* Render the visual slider for the switch */}
      {/* 渲染开关的视觉滑块 */}
      <span className={styles["slider"]}></span>
    </label>
  );
};


interface TextSwitchProps extends SwitchProps {
  icon?: string; // Optional icon to display next to the switch
  // 可选图标，用于在开关旁边显示
  text: string; // The text label associated with the switch
  // 与开关相关的文本标签
  fullLine?: boolean; // Optional prop to fill the line
  // 可选属性，用于填充线条
}

export const TextSwitch: React.FC<TextSwitchProps> = ({ icon, size = "medium", onChange, text, checked, fullLine = false }) => {
  return (
    <div className={`${styles["text-switch"]} ${fullLine ? styles["full-line"] : ""}`}>
      <div className={`${styles["text-label"]} ${styles[size]}`}>
        {icon && <Icon icon={icon} className={`${styles["icon"]}`} />}
        <div className={styles["text"]}>
          {text}
        </div>
        </div>
      <Switch size={size} onChange={onChange} checked={checked} />
    </div>
  );
};