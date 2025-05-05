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
import { KanbanType } from "../Types/KanbanType";
import { HoverBox } from "./HoverBox";
import { Icon } from "./Icon";
import styles from "./KanbanGroup.module.scss";
import { useState, useRef } from "react";



export interface KanbanGroupProps {
  title: string;
  kanbanList: KanbanType[];
  style?: React.CSSProperties;
}

export const KanbanGroup: React.FC<KanbanGroupProps> = ({
  title,
  kanbanList,
  style,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const kanbanContentRef = useRef<HTMLDivElement>(null);

  // 👇 The `ref` here is used to reference the DOM element of the kanban content container. This allows programmatic access to the element, such as resetting its scroll position when switching tabs.

  // 👇 这里的 `ref` 用于引用看板内容容器的 DOM 元素。这使得可以通过编程方式访问该元素，例如在切换标签时重置其滚动位置。
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (kanbanContentRef.current) {
      kanbanContentRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={styles["kanban-group"]} style={style}>
      <div className={styles["kanban-group-title"]}>{title}</div>
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
            {kanban.icon && (
              <Icon className={styles["icon"]} icon={kanban.icon} />
            )}
            {kanban.title}
            <HoverBox mode={"default"} />
          </div>
        ))}
      </div>

      <div className={styles["kanban-group-content"]} ref={kanbanContentRef}>
        <div className={styles["kanban"]}>
          {kanbanList[activeTab].content}
        </div>
      </div>
    </div>
  );
};
