/* 
# 关于这个组件

`Dropdown` 是一个 React 组件，用于实现带有下拉菜单的触发器功能。它的主要特点和功能包括：

## 功能概述
1. **触发器与菜单的结合**：
   - `Dropdown` 组件将一个触发器与一个下拉菜单绑定在一起，用户点击触发器时可以打开或关闭菜单。

2. **菜单内容动态渲染**：
   - 菜单的内容通过 `dropdownContent` 属性传入，支持自定义内容。

3. **菜单位置和大小控制**：
   - 通过 `position` 属性，可以设置菜单相对于触发器的位置（"left" 或 "right"）。
   - 通过 `dropdownSize` 属性，可以设置菜单的大小（"small"、"medium" 或 "large"）。

4. **点击外部关闭菜单**：
   - 使用全局事件监听器，当用户点击菜单外部区域时，菜单会自动关闭。

5. **样式与交互**：
   - 使用 `Dropdown.module.scss` 定义了样式，支持动态样式切换（如打开时添加 `open` 样式）。
   - 支持通过 `className` 属性传入额外的样式类。

## 属性说明
- `trigger`：触发器的内容，可以是任意 React 节点。
- `dropdownContent`：下拉菜单的内容，可以是任意 React 节点。
- `dropdownSize`：菜单的大小，可以是 "small"、"medium" 或 "large"。
- `position`：菜单的位置，可以是 "left" 或 "right"。
- `className`：可选的额外样式类。
- `onClick`：可选的点击事件处理函数。
- `unreadCount`：未读数量。
- `unreadMode`：提示模式，可以是 "number" 或 "dot"。

## 内部状态与逻辑
1. **状态管理**：
   - `isOpen`：用于管理菜单的打开/关闭状态。
   - `menuRef`：用于引用菜单按钮的 DOM 元素，方便处理点击外部关闭菜单的逻辑。

2. **事件处理**：
   - `handleBtnClick`：切换菜单的打开/关闭状态，并调用 `onClick` 回调（如果提供）。
   - `handleClickOutside`：检测点击是否发生在菜单外部，如果是则关闭菜单。
   - `handleItemClick`：当菜单项被点击时关闭菜单。

3. **生命周期管理**：
   - 使用 `useEffect` 在组件挂载时添加全局的 `mousedown` 事件监听器，用于检测点击外部区域的操作。
   - 在组件卸载时移除监听器，避免内存泄漏。

## 使用场景
- 导航栏中的用户菜单。
- 设置按钮的下拉选项。
- 任何需要触发器与菜单结合的交互场景。
*/

import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  trigger: React.ReactNode; // The trigger element for the dropdown menu // 下拉菜单的触发元素
  dropdownContent: React.ReactNode; // The content of the dropdown menu // 下拉菜单的内容
  dropdownSize: "small" | "medium" | "large"; // The size of the dropdown menu // 下拉菜单的大小
  position: "right" | "left"; // The position of the dropdown menu relative to the trigger // 下拉菜单相对于触发器的位置
  className?: string; // Optional additional CSS class for styling // 可选的额外样式类
  onClick?: () => void; // Optional callback for click events // 可选的点击事件回调
  unreadCount?: number; // Number of unread items to display // 显示未读项目的数量
  unreadMode?: "number" | "dot"; // Mode for displaying unread indicators // 显示未读指示器的模式
}

export const ClickToClose = "click-to-close";

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  dropdownContent,
  dropdownSize,
  position,
  className,
  onClick,
  unreadCount = 0,
  unreadMode = "dot",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Toggles the `.open` class to control the visibility of the dropdown.
  // This class is added or removed based on user interactions.
  // 切换 `.open` 类以控制下拉菜单的可见性。
  // 该类根据用户交互被添加或移除。
  const handleBtnClick = () => {
    setIsOpen(!isOpen); // Toggles the dropdown open/close state. // 切换下拉菜单的打开/关闭状态。
    if (onClick) onClick(); // Executes the optional onClick callback if provided. // 如果提供了 onClick 回调，则执行该回调。
  };

  // Handles clicks outside the dropdown to close it by removing the `.open` class.
  // This ensures that dropdowns close when the user clicks elsewhere on the page.
  // Enhanced to handle SVG elements and D3.js canvases properly.
  // 处理点击下拉菜单外部的操作，通过移除 `.open` 类来关闭菜单。
  // 这确保了当用户点击页面其他地方时，下拉菜单会关闭。
  // 增强以正确处理 SVG 元素和 D3.js 画布。
  const handleClickOutside = (event: MouseEvent | Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Closes the dropdown when clicking outside. // 当点击外部时关闭下拉菜单。
      
    }
  };

  // Handles clicks on dropdown items with the `.click-to-close` class.
  // This allows dropdowns to close when specific items are clicked.
  // 处理点击带有 `.click-to-close` 类的下拉菜单项的操作。
  // 这允许在点击特定项时关闭下拉菜单。
  const handleItemClick = () => {
    setIsOpen(false); // Closes the dropdown when a menu item is clicked. // 当点击菜单项时关闭下拉菜单。
  };

  useEffect(() => {
    // Adds multiple global event listeners to detect clicks outside the dropdown.
    // This includes both mousedown and click events to handle SVG elements properly.
    // Also uses capture phase to catch events before D3.js might intercept them.
    // 添加多个全局事件监听器以检测点击下拉菜单外部的操作。
    // 包括 mousedown 和 click 事件以正确处理 SVG 元素。
    // 同时使用捕获阶段以在 D3.js 可能拦截事件之前捕获它们。
    document.addEventListener("mousedown", handleClickOutside, true); // Use capture phase
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      // Removes the event listeners to prevent memory leaks.
      // 移除事件监听器以防止内存泄漏。
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      // Selects all elements with the `.click-to-close` class inside the dropdown.
      // 选择下拉菜单中所有带有 `.click-to-close` 类的元素。
      const clickToCloseElements = menuRef.current.querySelectorAll(
        `.${ClickToClose}`
      );
      clickToCloseElements.forEach((element) => {
        // Adds a click event listener to close the dropdown when these elements are clicked。
        // 添加点击事件监听器，当点击这些元素时关闭下拉菜单。
        element.addEventListener("click", handleItemClick);
      });

      return () => {
        // Removes the click event listeners to prevent memory leaks.
        // 移除点击事件监听器以防止内存泄漏。
        clickToCloseElements.forEach((element) => {
          element.removeEventListener("click", handleItemClick);
        });
      };
    }
  }, [dropdownContent]);

  return (
    <div ref={menuRef} className={`${styles["dropdown"]} ${className}`}>
      <div onClick={handleBtnClick} className={styles["trigger-container"]}>
        {trigger}
        {/* Renders an unread indicator if `unreadCount` is greater than 0. */}
        {/* The indicator can either be a dot or a number, based on the `unreadMode` prop. */}
        {/* 如果 `unreadCount` 大于 0，则渲染未读指示器。 */}
        {/* 指示器可以是一个点或一个数字，取决于 `unreadMode` 属性。 */}
        {unreadCount > 0 && (
          <div
            className={`${styles["unread-indicator"]} ${
              unreadMode === "dot" ? styles["dot"] : styles["number"]
            }`}
          >
            {/* Displays the unread count if `unreadMode` is set to "number". */}
            {/* 如果 `unreadMode` 设置为 "number"，则显示未读数量。 */}
            {unreadMode === "number" ? (unreadCount > 99 ? "99" : unreadCount) : ""}
          </div>
        )}
      </div>
      <div
        className={`${styles["dropdown-content"]} ${styles[position]} ${
          styles[dropdownSize]
        } ${isOpen ? styles["open"] : ""}`}
      >
        {dropdownContent}
      </div>
    </div>
  );
};
