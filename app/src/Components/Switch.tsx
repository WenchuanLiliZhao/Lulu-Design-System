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

import React from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
  checked: boolean;
  size: "small" | "medium" | "large";
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, size, onChange }) => {
  return (
    <label className={`${styles["switch"]} ${styles[size]}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label="Toggle switch"
      />
      <span className={styles["slider"]}></span>
    </label>
  );
};