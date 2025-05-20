import styles from "./Btn.module.scss";

import { HoverBox } from "./HoverBox";
import { Icon } from "../Icon";

export interface BtnProps {
  icon: string;
  size: "size-tiny" | "size-small" | "size-medium" | "size-nav-btn";
  mode?: "mode-outlined" | "mode-plain" | "mode-possitive-filled";
  className?: string;
  text?: string;
  deco?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: React.CSSProperties;
}

export const Btn: React.FC<BtnProps> = ({
  icon,
  size,
  mode = "outlined",
  deco,
  text,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
}) => {
  return (
    <div
      className={`${styles["btn"]} ${styles[size]} ${className} ${styles[mode]}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <Icon className={styles["icon"]} icon={icon} />
      {text && <span className={styles["text"]}>{text}</span>}
      {deco && <Icon className={styles["icon"]} icon={deco} />}
      <HoverBox mode={"default"} />
    </div>
  );
};

interface BtnDividerProps {
  size: "size-small" | "size-nav-btn";
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
