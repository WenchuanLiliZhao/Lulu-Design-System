import React from "react";
import { Icon } from "../Icon";
import { HoverBox } from "../SmallElements/HoverBox";
import styles from "./MenuItem.module.scss";

export interface MenuItem {
  icon?: string;
  text: string;
  onClick?: () => void;
}

interface MenuItemsProps {
  item: MenuItem;
  className?: string;
}

export const MenuItem: React.FC<MenuItemsProps> = ({ item, className }) => {
  return (
    <>
      <div
        className={`${styles["item"]} ${styles["cell"]} ${className}`}
        onClick={item.onClick}
      >
        {item.icon && <Icon className={styles["icon"]} icon={item.icon} />}
        {item.text}
        <HoverBox mode={"default"} />
      </div>
    </>
  );
};
