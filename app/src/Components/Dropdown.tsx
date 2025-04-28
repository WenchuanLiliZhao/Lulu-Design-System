/* 
# 关于这个组件

`MenuBtn` 是一个 React 组件，用于实现带有下拉菜单的按钮功能。它的主要特点和功能包括：

## 功能概述
1. **按钮与菜单的结合**：
   - `MenuBtn` 组件将一个按钮与一个下拉菜单绑定在一起，用户点击按钮时可以打开或关闭菜单。

2. **菜单内容动态渲染**：
   - 菜单的内容通过 `menuContent` 属性传入，支持分组和自定义内容。

3. **菜单位置控制**：
   - 通过 `position` 属性，可以设置菜单相对于按钮的位置（"left" 或 "right"）。

4. **点击外部关闭菜单**：
   - 使用全局事件监听器，当用户点击菜单外部区域时，菜单会自动关闭。

5. **样式与交互**：
   - 使用 `MenuBtn.module.scss` 定义了样式，支持动态样式切换（如打开时添加 `open` 样式）。
   - 支持通过 `className` 属性传入额外的样式类。

## 属性说明
- `btn`：按钮的内容，可以是任意 React 节点。
- `menuContent`：菜单的内容，类型与 `Menu` 组件的 `items` 属性一致。
- `position`：菜单的位置，可以是 "left" 或 "right"。
- `className`：可选的额外样式类。
- `onClick`：可选的点击事件处理函数。

## 内部状态与逻辑
1. **状态管理**：
   - `isOpen`：用于管理菜单的打开/关闭状态。
   - `menuRef`：用于引用菜单按钮的 DOM 元素，方便处理点击外部关闭菜单的逻辑。

2. **事件处理**：
   - `handleBtnClick`：切换菜单的打开/关闭状态，并调用 `onClick` 回调（如果提供）。
   - `handleClickOutside`：检测点击是否发生在菜单外部，如果是则关闭菜单。

3. **生命周期管理**：
   - 使用 `useEffect` 在组件挂载时添加全局的 `mousedown` 事件监听器，用于检测点击外部区域的操作。
   - 在组件卸载时移除监听器，避免内存泄漏。

## 使用场景
- 导航栏中的用户菜单。
- 设置按钮的下拉选项。
- 任何需要按钮与菜单结合的交互场景。
*/


import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  trigger: React.ReactNode;
  dropdownContent: React.ReactNode;
  dropdownSize: "small" | "medium" | "large";
  position: "left" | "right";
  className?: string;
  onClick?: () => void;
}


export const ClickToClose = "click-to-close";


export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  dropdownContent,
  dropdownSize,
  position,
  className,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleBtnClick = () => {
    setIsOpen(!isOpen);
    if (onClick) onClick();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      const clickToCloseElements = menuRef.current.querySelectorAll(
        `.${ClickToClose}`
      );
      clickToCloseElements.forEach((element) => {
        element.addEventListener("click", handleItemClick);
      });

      return () => {
        clickToCloseElements.forEach((element) => {
          element.removeEventListener("click", handleItemClick);
        });
      };
    }
  }, [dropdownContent]);

  return (
    <div
      ref={menuRef}
      className={`${styles["dropdown-btn"]} ${
        isOpen ? styles["open"] : ""
      } ${className}`}
    >
      <div onClick={handleBtnClick}>{trigger}</div>
      <div
        className={`${styles["dropdown-content"]} ${styles[position]} ${styles[dropdownSize]}`}
      >
        {dropdownContent}
      </div>
    </div>
  );
};
