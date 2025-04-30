import styles from "./Btn.module.scss";

import { HoverBox } from "./HoverBox";
import { Icon } from "./Icon";

export interface BtnProps {
  icon: string;
  place: "default" | "nav-btn";
  className?: string;
  text?: string;
  deco?: string;
  onClick?: () => void;
}

export const Btn: React.FC<BtnProps> = ({
  icon,
  place,
  deco,
  text,
  className,
  onClick,
}) => {
  return (
    <div className={`${styles["btn"]} ${styles[place]} ${className}`} onClick={onClick}>
      <Icon icon={icon} />
      {text && <span>{text}</span>}
      {deco && (
        <Icon icon={deco} />
      )}
      <HoverBox mode={"default"} />
    </div>
  );
};
