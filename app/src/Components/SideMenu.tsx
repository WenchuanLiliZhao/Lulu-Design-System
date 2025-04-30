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
