import styles from "./Nav.module.scss";

import { ReactNode } from "react";

interface NavProps {
  items: {
    left?: ReactNode[];
    middle?: ReactNode[];
    right?: ReactNode[];
  };
}

export const Nav = ({ items }: NavProps) => {
  return (
    <nav className={styles["nav"]}>
      <div className={styles["nav-background"]}></div>
      <div className={styles["nav-container"]}>
        <div className={styles["item-container"]}>
          {items.left && (
            <div className={styles["item-group"]}>
              {items.left.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
          {items.middle && (
            <div className={styles["item-group"]}>
              {items.middle.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
          {items.right && (
            <div className={styles["item-group"]}>
              {items.right.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
