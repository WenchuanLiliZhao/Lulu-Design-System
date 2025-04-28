import { ClickToClose } from "./Dropdown";
import { HoverBox } from "./HoverBox";
import { Icon } from "./Icon";
import styles from "./Menu.module.scss";

export interface MenuProps {
  items: {
    groupTitle?: string;
    groupItems: {
      icon?: string;
      text: string;
      onClick?: () => void;
    }[];
  }[];
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({ items, className }) => {
  return (
    <div className={`${styles["menu"]} ${className}`}>
      {Object.values(items).map((group, i) => (
        <div key={i} className={styles["group"]}>
          {group.groupTitle && (
            <>
              <div className={`${styles["group-title"]} ${styles["cell"]}`}>
                {group.groupTitle}
              </div>
            </>
          )}
          <div className={styles["items"]}>
            {group.groupItems.map((item, j) => (
              <div key={j} className={`${styles["item"]} ${styles["cell"]}`} onClick={item.onClick}>
                {item.icon && <Icon className={styles["icon"]} icon={item.icon} />}
                {item.text}
                <HoverBox mode={"default"} className={ClickToClose} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

