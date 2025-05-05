/* 
## Component Overview
- The `SideMenu` component is a React component designed to render a collapsible side navigation menu.
- It displays grouped navigation items, each linking to specific pages, and includes a header with a logo and site title.

### Key Implementation Challenges
- Managing the open/close state of the menu while ensuring proper cleanup of event listeners to avoid memory leaks.
- Handling click events outside the menu to close it, requiring precise DOM manipulation with `useRef` and event listeners.
- Integrating cross-file dependencies such as `ToggleBodyScroll` to manage body scroll behavior when the menu is open.
- Dynamically rendering menu items and groups based on the `itemGroups` prop, ensuring flexibility and scalability.

## 组件功能概览
- `SideMenu` 是一个 React 组件，用于渲染可折叠的侧边导航菜单。
- 它显示分组的导航项，每个导航项链接到特定页面，并包含一个带有 Logo 和站点标题的头部。

### 主要实现难点
- 管理菜单的打开/关闭状态，同时确保事件监听器的正确清理以避免内存泄漏。
- 处理菜单外部的点击事件以关闭菜单，需要使用 `useRef` 和事件监听器进行精确的 DOM 操作。
- 集成跨文件依赖，例如 `ToggleBodyScroll`，以在菜单打开时管理页面滚动行为。
- 根据 `itemGroups` 属性动态渲染菜单项和分组，确保组件的灵活性和可扩展性。
*/

import React, { useState, useRef, useEffect } from "react";
import styles from "./SideMenu.module.scss";
import { Btn } from "./Btn";
import { Page } from "../Types/PageType";
import { HoverBox } from "./HoverBox";
import { ToggleBodyScroll } from "../Functions/ToggleBodyScroll";
import { Logo } from "../assets/Img/Logo";
import { SiteInfoType } from "../Types/SiteInfoType";
import { Icon } from "./Icon";

interface SideMenuItemGroup {
  groupTitle: string;
  items: Page[];
}

interface SideMenuProps {
  siteInfo: SiteInfoType;
  itemGroups: SideMenuItemGroup[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ siteInfo, itemGroups }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    ToggleBodyScroll(isOpen);
    return () => ToggleBodyScroll(false); // Ensure scroll is enabled on unmount
  }, [isOpen]);

  return (
    <div className={styles["side-menu"]}>
      <Btn icon={"menu"} place={"nav-btn"} onClick={handleBtnClick} />

      <div
        className={`${styles["bg-btn"]} ${isOpen ? styles["open"] : ""}`}
      ></div>

      <div
        ref={menuRef}
        className={`${styles["menu"]} ${isOpen ? styles["open"] : ""}`}
      >
        <div className={styles["menu-header"]}>
          <Logo mode={"FullColorNoText"} className={styles["logo"]} />
          <div className={styles["text"]}>{siteInfo.title}</div>
        </div>

        <div className={styles["menu-body"]}>
          {itemGroups.map((group, index) => (
            <div key={index} className={styles["menu-group"]}>
              {group.groupTitle !== "" && (
                <div className={styles["group-title"]}>{group.groupTitle}</div>
              )}
              <div className={styles["menu-items"]}>
                {group.items.map((item) => (
                  <a
                    key={item.info.slug}
                    className={styles["menu-item"]}
                    href={`/${item.info.slug}`}
                  >
                    <Icon icon={item.info.icon ? `${item.info.icon}` : "description"} className={styles["icon"]} />
                    {item.info.title}
                    <HoverBox />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
