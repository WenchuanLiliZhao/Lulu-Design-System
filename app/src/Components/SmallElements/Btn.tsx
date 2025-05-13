/* eslint-disable react-refresh/only-export-components */
import styles from "./Btn.module.scss";

import { HoverBox } from "./HoverBox";
import { Icon } from "../Icon";

export interface BtnProps {
  icon: string;
  size: "size-default" | "size-nav-btn";
  outline?: boolean;
  className?: string;
  text?: string;
  deco?: string;
  onClick?: () => void;
}

export const Btn: React.FC<BtnProps> = ({
  icon,
  size,
  outline = true,
  deco,
  text,
  className,
  onClick,
}) => {
  return (
    <div
      className={`${styles["btn"]} ${styles[size]} ${className} ${
        outline ? styles["outlined"] : ""
      }`}
      onClick={onClick}
    >
      <Icon icon={icon} />
      {text && <span>{text}</span>}
      {deco && <Icon icon={deco} />}
      <HoverBox mode={"default"} />
    </div>
  );
};

interface BtnDividerProps {
  size: "size-default" | "size-nav-btn";
}

export const BtnDivider: React.FC<BtnDividerProps> = ({size}) => {
  return (
    <div className={`${styles["btn-divider"]} ${styles[size]}`}>
      {/* Render a stroke element to visually separate sections */}
      {/* 渲染一个线条元素以在视觉上分隔部分 */}
      <div className={styles["stroke"]}></div>
    </div>
  );
};
