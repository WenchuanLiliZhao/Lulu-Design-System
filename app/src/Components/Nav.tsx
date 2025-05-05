/* 
## Component Overview
- The `Nav` component is a React functional component designed to render a navigation bar with three customizable sections: `left`, `middle`, and `right`.
  - Each section can contain an array of React nodes, allowing for flexible content placement.
- The `NavDivider` component is a simple divider used to visually separate sections within the navigation bar.

### Key Implementation Challenges
- **Dynamic Rendering of Sections**:
  - The `Nav` component dynamically renders its sections (`left`, `middle`, `right`) based on the `items` prop. This requires careful handling of optional props and conditional rendering to ensure no empty sections are rendered.
- **Styling and Responsiveness**:
  - The `div.nav-bg` element is included to maintain vertical space for the navigation bar when it is positioned as `fixed`, simplifying layout calculations for the rest of the page.
- **Cross-Component Interaction**:
  - The `Nav` component is often used in conjunction with other components like `SearchBar`, `Dropdown`, and `ThemeMenu`, which are passed as children to the `items` prop. This allows for seamless integration of additional functionality within the navigation bar.

## 组件功能概览
- `Nav` 是一个 React 函数组件，用于渲染导航栏，支持三个可自定义的部分：`left`、`middle` 和 `right`。
  - 每个部分可以包含一个 React 节点数组，从而实现灵活的内容布局。
- `NavDivider` 是一个简单的分隔线组件，用于在导航栏中实现视觉上的分隔。

### 主要实现难点
- **动态渲染部分内容**：
  - `Nav` 组件根据 `items` 属性动态渲染 `left`、`middle` 和 `right` 部分。需要谨慎处理可选属性和条件渲染，确保不会渲染空的部分。
- **样式和响应式设计**：
  - `div.nav-bg` 元素用于在导航栏设置为 `fixed` 时保持垂直空间，从而简化页面其他部分的布局计算。
- **跨组件交互**：
  - `Nav` 组件通常与其他组件（如 `SearchBar`、`Dropdown` 和 `ThemeMenu`）结合使用，这些组件通过 `items` 属性作为子元素传递，从而在导航栏中无缝集成额外功能。
*/

import styles from "./Nav.module.scss";

import React, { ReactNode } from "react";

interface NavProps {
  items: {
    left?: ReactNode[];
    middle?: ReactNode[];
    right?: ReactNode[];
  };
}

export const Nav: React.FC<NavProps> = ({ items }) => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["nav-bg"]}></div>
      <div className={styles["nav-container"]}>
        <div className={styles["item-container"]}>
          {items.left && (
            <div className={styles["item-group"]}>
              {items.left.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
          {items.middle && (
            <div className={styles["item-group"]}>
              {items.middle.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
          {items.right && (
            <div className={styles["item-group"]}>
              {items.right.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const NavDivider: React.FC = () => {
  return (
    <div className={styles["nav-divider"]}>
      <div className={styles["stroke"]}></div>
    </div>
  );
};
