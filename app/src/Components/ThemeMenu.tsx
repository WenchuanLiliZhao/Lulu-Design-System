/* 
## Component Overview
- `ThemeMenu` is a React functional component designed to provide a dropdown menu for selecting theme preferences (e.g., light mode, dark mode, or system-adapted mode).
- It dynamically updates the `data-theme` attribute on the `<html>` element to reflect the selected theme.
- The component uses localStorage to persist the user's theme preference across sessions.

### Key Implementation Challenges
- **Dynamic Theme Switching**: The component ensures seamless updates to the `data-theme` attribute on the `<html>` element, enabling global theme changes without reloading the page.
- **State Persistence**: It retrieves and stores the theme preference in `localStorage`, ensuring the user's choice is remembered across browser sessions.
- **Cross-Component Interaction**: 
  - Utilizes the `Dropdown` component to render the menu.
  - Uses the `Btn` component as the trigger for the dropdown.
  - Leverages the `Menu` component to display grouped menu items with icons and click handlers.

## 组件功能概览
- `ThemeMenu` 是一个 React 函数组件，用于提供主题偏好选择的下拉菜单（例如，浅色模式、深色模式或适配系统模式）。
- 它动态更新 `<html>` 元素上的 `data-theme` 属性，以反映所选主题。
- 组件使用 localStorage 持久化用户的主题偏好，以便在会话之间保持一致。

### 主要实现难点
- **动态主题切换**：组件确保无缝更新 `<html>` 元素上的 `data-theme` 属性，从而实现全局主题更改，无需刷新页面。
- **状态持久化**：通过 localStorage 获取和存储主题偏好，确保用户的选择在浏览器会话之间得以保留。
- **跨组件交互**：
  - 使用 `Dropdown` 组件渲染下拉菜单。
  - 使用 `Btn` 组件作为下拉菜单的触发器。
  - 使用 `Menu` 组件显示带有图标和点击事件处理器的分组菜单项。
*/

import React, { useEffect, useState } from "react";
import { Menu } from "./Menu";
import { Btn } from "./Btn";
import { Dropdown } from "./Dropdown";

export const ThemeMenu: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    // 从 localStorage 获取初始值
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    // 根据主题设置 data-theme 属性
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // 将主题存储到 localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 根据主题选择图标
  const getIconForTheme = () => {
    if (theme === "light") return "light_mode";
    if (theme === "dark") return "dark_mode";
    return "contrast"; // Default for "system"
  };

  return (
    <Dropdown
      trigger={<Btn icon={getIconForTheme()} place={"nav-btn"} deco={"arrow_drop_down"} />}
      dropdownContent={<Menu items={[
        {
          groupTitle: "Theme Preferences",
          groupItems: [
            {
              text: "Adapt System",
              icon: "contrast",
              onClick: () => setTheme("system"),
            },
            {
              text: "Light Mode",
              icon: "light_mode",
              onClick: () => setTheme("light"),
            },
            {
              text: "Dark Mode",
              icon: "dark_mode",
              onClick: () => setTheme("dark"),
            },
          ],
        },
      ]} />}
      position={"left"}
      dropdownSize={"small"}
    />
  );
};
