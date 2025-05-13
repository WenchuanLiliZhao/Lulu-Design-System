import React from "react";
import styles from "../Nav.module.scss";

export const NavItem_Divider: React.FC = () => {
  return (
    <div className={styles["nav-item--divider"]}>
      {/* Render a stroke element to visually separate sections */}
      {/* 渲染一个线条元素以在视觉上分隔部分 */}
      <div className={styles["stroke"]}></div>
    </div>
  );
};
