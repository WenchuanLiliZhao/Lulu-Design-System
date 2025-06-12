/* 
## Component Overview
- `SidebarTabs` is a React component designed specifically for sidebar navigation with horizontal tabs.
- Each tab represents different content sections, such as "对象浏览", "我的收藏", "我的订阅".
- Similar to KanbanGroup but optimized for sidebar use with compact styling.

### Key Implementation Challenges
- **Compact Tab Design**: Designed specifically for sidebar use with condensed spacing
- **Dynamic Content Switching**: Manages active tab state and renders corresponding content
- **Responsive Tab Layout**: Handles overflow for many tabs with scroll functionality

## 组件功能概览
- `SidebarTabs` 是专门为侧边栏导航设计的带有横向标签的 React 组件。
- 每个标签代表不同的内容部分，如"对象浏览"、"我的收藏"、"我的订阅"。
- 类似于 KanbanGroup，但针对侧边栏使用进行了优化，采用紧凑样式。

### 主要实现难点
- **紧凑标签设计**：专为侧边栏使用而设计，采用紧凑间距
- **动态内容切换**：管理激活标签状态并渲染相应内容
- **响应式标签布局**：处理多标签时的溢出和滚动功能
*/

import React from "react";
import { HoverBox } from "../SmallElements/HoverBox";
import styles from "./SidebarTabs.module.scss";
import { useState, useRef } from "react";
import { Icon } from "../Icon";

export interface SidebarTabItem {
  title: string;
  icon?: string;
  content: React.ReactNode;
}

export interface SidebarTabsProps {
  tabs: SidebarTabItem[];
}

export const SidebarTabs: React.FC<SidebarTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={styles["sidebar-tabs"]}>
      {/* Render the tabs navigation */}
      <div className={styles["tabs-nav"]}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={
              index === activeTab
                ? `${styles["tab"]} ${styles["active"]}`
                : styles["tab"]
            }
            onClick={() => handleTabClick(index)}
          >
            {tab.icon && (
              <Icon className={styles["icon"]} icon={tab.icon} />
            )}
            <span className={styles["tab-title"]}>{tab.title}</span>
            <HoverBox mode={"default"} />
          </div>
        ))}
      </div>

      {/* Render the content of the active tab */}
      <div className={styles["tab-content"]} ref={contentRef}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}; 