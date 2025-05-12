import React, { useEffect, useState } from "react";
import { Menu } from "../Menu";
import { Btn } from "./Btn";
import { Dropdown } from "../Dropdown";

/* 
## Component Overview
- `ThemeMenu` is a React functional component designed to provide a dropdown menu for selecting theme preferences (e.g., light mode, dark mode, or system-adapted mode).
- It dynamically updates the `data-theme` attribute on the `<html>` element to reflect the selected theme.
- The component uses localStorage to persist the user's theme preference across sessions.

## 组件功能概览
- `ThemeMenu` 是一个 React 函数组件，用于提供主题偏好选择的下拉菜单（例如，浅色模式、深色模式或适配系统模式）。
- 它动态更新 `<html>` 元素上的 `data-theme` 属性，以反映所选主题。
- 组件使用 localStorage 持久化用户的主题偏好，以便在会话之间保持一致。
*/

export const ThemeMenu: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    // Retrieve the initial theme value from localStorage
    // 从 localStorage 获取初始主题值
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    // Update the `data-theme` attribute on the <html> element based on the selected theme
    // 根据选定的主题更新 <html> 元素上的 `data-theme` 属性
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // Store the selected theme in localStorage
    // 将选定的主题存储到 localStorage 中
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Determine the appropriate icon for the current theme
  // 根据当前主题选择合适的图标
  const getIconForTheme = () => {
    if (theme === "light") return "light_mode";
    if (theme === "dark") return "dark_mode";
    return "contrast"; // Default for "system"
    // 默认图标为 "system"
  };

  return (
    <Dropdown
      // Use the `Btn` component as the trigger for the dropdown menu
      // 使用 `Btn` 组件作为下拉菜单的触发器
      trigger={<Btn icon={getIconForTheme()} place={"nav-btn"} deco={"arrow_drop_down"} />}
      // Render the dropdown menu content using the `Menu` component
      // 使用 `Menu` 组件渲染下拉菜单内容
      dropdownContent={<Menu items={[
        {
          groupTitle: "Theme Preferences",
          // 分组标题：主题偏好
          groupItems: [
            {
              text: "Adapt System",
              // 菜单项文本：适配系统
              icon: "contrast",
              onClick: () => setTheme("system"),
            },
            {
              text: "Light Mode",
              // 菜单项文本：浅色模式
              icon: "light_mode",
              onClick: () => setTheme("light"),
            },
            {
              text: "Dark Mode",
              // 菜单项文本：深色模式
              icon: "dark_mode",
              onClick: () => setTheme("dark"),
            },
          ],
        },
      ]} />}
      position={"right"}
      // Set the dropdown menu position to the left
      // 将下拉菜单位置设置为左侧
      dropdownSize={"small"}
      // Set the dropdown menu size to small
      // 将下拉菜单大小设置为小
    />
  );
};
