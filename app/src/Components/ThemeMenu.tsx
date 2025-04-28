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
      trigger={<Btn icon={getIconForTheme()} mode={"nav-btn"} deco={"arrow_drop_down"} />}
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
