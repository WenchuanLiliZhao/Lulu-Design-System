/* 
## Component Overview
- `KanbanGroup` is a React component designed to display a group of Kanban boards with tabbed navigation.
- Each tab represents a Kanban board, and clicking on a tab switches the displayed content.
- Supports dynamic rendering of Kanban boards based on the `kanbanList` prop, which includes the title, icon, and content for each board.

### Key Implementation Challenges
- **Dynamic Tab Navigation**: The component uses the `useState` hook to manage the active tab and dynamically updates the displayed content based on user interaction.
- **Scroll Reset on Tab Switch**: A `useRef` is used to reference the Kanban content container, allowing the scroll position to reset when switching tabs.

## 组件功能概览
- `KanbanGroup` 是一个 React 组件，用于展示带有标签导航的看板组。
- 每个标签对应一个看板，点击标签可以切换显示的内容。
- 支持根据 `kanbanList` 属性动态渲染看板，`kanbanList` 包括每个看板的标题、图标和内容。

### 主要实现难点
- **动态标签导航**：通过 `useState` 钩子管理当前激活的标签，并根据用户交互动态更新显示内容。
- **切换标签时的滚动重置**：使用 `useRef` 引用看板内容容器，在切换标签时重置滚动位置。
*/

import React from "react";
import { KanbanType } from "../../ObjectShapes/KanbanShape";
import { HoverBox } from "../SmallElements/HoverBox";
import styles from "./KanbanGroup.module.scss";
import { useState, useRef } from "react";
import { Icon } from "../Icon";

export interface KanbanGroupProps {
  title: string; // The title of the Kanban group
  // 看板组的标题
  kanbanList: KanbanType[]; // The list of Kanban boards to display
  // 要显示的看板列表
  style?: React.CSSProperties; // Optional custom styles for the component
  // 组件的可选自定义样式
}

export const KanbanGroup: React.FC<KanbanGroupProps> = ({
  title,
  kanbanList,
  style,
}) => {
  const [activeTab, setActiveTab] = useState(0); 
  // State to track the currently active tab
  // 用于跟踪当前激活的标签的状态

  const kanbanContentRef = useRef<HTMLDivElement>(null); 
  // Reference to the Kanban content container for programmatic access
  // 用于引用看板内容容器的引用，便于编程访问

  const handleTabClick = (index: number) => {
    setActiveTab(index); 
    // Update the active tab index
    // 更新激活的标签索引

    if (kanbanContentRef.current) {
      kanbanContentRef.current.scrollTop = 0; 
      // Reset the scroll position of the content container
      // 重置内容容器的滚动位置
    }
  };

  return (
    <div className={styles["kanban-group"]} style={style}>
      {/* Render the title of the Kanban group */}
      {/* 渲染看板组的标题 */}
      <div className={styles["kanban-group-title"]}>{title}</div>

      {/* Render the tabs for each Kanban board */}
      {/* 为每个看板渲染标签 */}
      <div className={styles["kanban-tabs"]}>
        {kanbanList.map((kanban, index) => (
          <div
            key={index}
            className={
              index === activeTab
                ? `${styles["kanban-tab"]} ${styles["active"]}`
                : styles["kanban-tab"]
            }
            onClick={() => handleTabClick(index)}
          >
            {/* Render the icon for the Kanban tab if available */}
            {/* 如果有图标，则渲染看板标签的图标 */}
            {kanban.icon && (
              <Icon className={styles["icon"]} icon={kanban.icon} />
            )}
            {kanban.title}
            <HoverBox mode={"default"} />
          </div>
        ))}
      </div>

      {/* Render the content of the active Kanban board */}
      {/* 渲染当前激活看板的内容 */}
      <div className={styles["kanban-group-content"]} ref={kanbanContentRef}>
        <div className={styles["kanban"]}>
          {kanbanList[activeTab].content}
        </div>
      </div>
    </div>
  );
};
