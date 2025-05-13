/* eslint-disable react-refresh/only-export-components */
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

import { Logo } from "../assets/Img/Logo";
import { Placeholder } from "../assets/Img/Placeholder";
import { HoverBox } from "./SmallElements/HoverBox";
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
      {/* Render a background element to maintain vertical space for the navigation bar */}
      {/* 渲染一个背景元素以保持导航栏的垂直空间 */}
      <div className={styles["nav-bg"]}></div>

      {/* Render the main container for the navigation bar */}
      {/* 渲染导航栏的主容器 */}
      <div className={styles["nav-container"]}>
        <div className={styles["item-container"]}>
          {/* Render the left section of the navigation bar if items are provided */}
          {/* 如果提供了项目，则渲染导航栏的左侧部分 */}
          {items.left && (
            <div className={styles["item-group"]}>
              {items.left.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}

          {/* Render the middle section of the navigation bar if items are provided */}
          {/* 如果提供了项目，则渲染导航栏的中间部分 */}
          {items.middle && (
            <div className={styles["item-group"]}>
              {items.middle.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}

          {/* Render the right section of the navigation bar if items are provided */}
          {/* 如果提供了项目，则渲染导航栏的右侧部分 */}
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

interface NavItem_SiteTitleBarProps {
  text: string;
  to: string;
}

export const NavItem_SiteTitleBar: React.FC<NavItem_SiteTitleBarProps> = ({
  text, to
}) => {
  return (
    <a href={`/${to}`} className={styles["nav-item--logo-bar"]}>
      <Logo mode="FullColorNoText" className={styles["logo"]} />
      <div className={styles["text"]}>{text}</div>
    </a>
  );
};

interface NavItem_UserAvatarProps {
  avatarUrl: string | undefined;
  onClick?: () => void;
}

export const NavItem_UserAvatar: React.FC<NavItem_UserAvatarProps> = ({
  avatarUrl,
}) => {
  return (
    <div className={styles["nav-item--user-avatar"]}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="User Avatar" className={styles["avatar"]} />
      ) : (
        <Placeholder element="UserAvatar" className={styles["avatar"]} />
      )}
      <HoverBox mode={"default"} />
    </div>
  );
};

