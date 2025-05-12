/* 
## Component Overview
- This file contains a React component designed to render a layout with a resizable sidebar and a main content area.
- The sidebar supports dynamic resizing, toggling visibility, and customizable minimum and maximum widths.
- The component ensures a responsive and user-friendly interface by handling mouse events for resizing and state transitions for collapsing the sidebar.

### Key Implementation Challenges
- Managing dynamic state updates for sidebar resizing and visibility toggling.
- Implementing mouse event listeners to enable smooth resizing functionality.

## 组件功能概览
- 此文件包含一个用于渲染带有可调整大小侧边栏和主内容区域的布局的 React 组件。
- 侧边栏支持动态调整大小、切换可见性，以及自定义最小和最大宽度。
- 组件通过处理鼠标事件实现调整大小功能，并通过状态转换实现侧边栏折叠，确保界面响应性和用户友好性。

### 主要实现难点
- 管理侧边栏调整大小和可见性切换的动态状态更新。
- 实现鼠标事件监听器以支持流畅的调整大小功能。
*/

import React, { useState, useEffect } from "react";
import styles from "./JiraLayout.module.scss";
import { Icon } from "./Icon";
import { HoverBox } from "./HoverBox";

interface JiraLayoutProps {
  sidebar: {
    title?: string; // Optional title for the sidebar
    // 侧边栏的可选标题
    content: React.ReactNode;
    minWidth?: number; // Minimum width for the sidebar
    // 侧边栏的最小宽度
    maxWidth?: number; // Maximum width for the sidebar
    // 侧边栏的最大宽度
  };
  mainContent: React.ReactNode;
}

export const JiraLayout: React.FC<JiraLayoutProps> = ({
  sidebar: {
    title: sidebarTitle = "Sidebar", // Default title for the sidebar
    content: sidebarContent,
    minWidth: sidebarMinWidth = 280, // Default minimum width for the sidebar
    maxWidth: sidebarMaxWidth = 600, // Default maximum width for the sidebar
  },
  mainContent,
}) => {
  // Retrieve the initial sidebar width and visibility state from localStorage
  const initialSidebarWidth = Number(localStorage.getItem("sidebarWidth")) || sidebarMinWidth;
  const initialIsHidden = localStorage.getItem("isSidebarHidden") === "true";

  const [sidebarWidth, setSidebarWidth] = useState(initialSidebarWidth);
  const [isHidden, setIsHidden] = useState(initialIsHidden);

  useEffect(() => {
    // Save the sidebar width to localStorage whenever it changes
    localStorage.setItem("sidebarWidth", sidebarWidth.toString());
  }, [sidebarWidth]);

  useEffect(() => {
    // Save the sidebar visibility state to localStorage whenever it changes
    localStorage.setItem("isSidebarHidden", isHidden.toString());
  }, [isHidden]);

  // Handle the mouse down event to initiate resizing of the sidebar
  // 处理鼠标按下事件以开始调整侧边栏大小
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX; // Record the initial mouse position
    // 记录初始鼠标位置
    const startWidth = sidebarWidth; // Record the initial sidebar width
    // 记录初始侧边栏宽度

    // Handle the mouse move event to dynamically adjust the sidebar width
    // 处理鼠标移动事件以动态调整侧边栏宽度
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.min(
        sidebarMaxWidth,
        Math.max(sidebarMinWidth, startWidth + moveEvent.clientX - startX)
      ); // Ensure the width is within the min and max bounds
      setSidebarWidth(newWidth); // Update the sidebar width
      // 更新侧边栏宽度
    };

    // Handle the mouse up event to stop resizing
    // 处理鼠标松开事件以停止调整大小
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove); // Remove the mouse move listener
      // 移除鼠标移动监听器
      document.removeEventListener("mouseup", handleMouseUp); // Remove the mouse up listener
      // 移除鼠标松开监听器
    };

    // Add event listeners for mouse move and mouse up
    // 添加鼠标移动和鼠标松开的事件监听器
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Toggle the visibility of the sidebar
  // 切换侧边栏的可见性
  const handleDisplayClick = () => {
    setIsHidden((prev) => !prev); // Toggle the hidden state
    // 切换隐藏状态
  };

  return (
    <div className={styles["jira-layout"]}>
      {/* Render the sidebar with dynamic width and resizable functionality */}
      {/* 渲染具有动态宽度和可调整大小功能的侧边栏 */}
      <div
        className={`${styles["sidebar"]}`}
        style={{
          width: isHidden ? `24px` : `${sidebarWidth}px`,
        }} // Adjust the sidebar width dynamically
        // 动态调整侧边栏宽度
      >
        <div
          className={`${styles["sidebar-switch-outside"]}`}
          onClick={handleDisplayClick}
          style={{ display: isHidden ? "flex" : "none" }} // Show switch when sidebar is collapsed
          // 当侧边栏折叠时显示开关
        >
          {/* <Icon className={styles["icon"]} icon={"arrow_right"} /> */}
        </div>

        <div
          className={`${styles["sidebar-body"]}`}
          style={{ display: isHidden ? "none" : "block" }} // Hide content when sidebar is collapsed
          // 当侧边栏折叠时隐藏内容
        >
          <div className={`${styles["sidebar-top-padding"]}`}></div>

          <div className={`${styles["sidebar-header"]}`}>
            <div className={`${styles["sidebar-title"]}`}>{sidebarTitle}</div>
            <div
              className={`${styles["sidebar-switch"]}`}
              onClick={handleDisplayClick}
            >
              <Icon className={styles["icon"]} icon={"side_navigation"} />
              <HoverBox />
            </div>
          </div>

          <div className={`${styles["sidebar-content"]}`}>{sidebarContent}</div>
          {/* Render a resizer handle for the sidebar */}
          {/* 渲染一个用于调整侧边栏大小的拖动条 */}
          <div
            className={styles["resizer"]}
            onMouseDown={handleMouseDown} // Start resizing on mouse down
            // 鼠标按下时开始调整大小
            style={{ display: isHidden ? "none" : "block" }} // Hide resizer when sidebar is collapsed
            // 当侧边栏折叠时隐藏调整大小条
          ></div>
        </div>
      </div>
      {/* Render the main content area */}
      {/* 渲染主内容区域 */}
      <div
        className={`${styles["main-content"]}`}
        style={{ marginLeft: isHidden ? `24px` : `${sidebarWidth}px` }} // Adjust the margin dynamically based on sidebar width
        // 根据侧边栏宽度动态调整边距
      >
        {mainContent}
      </div>
    </div>
  );
};
