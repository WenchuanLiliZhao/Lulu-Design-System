import React from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
  checked: boolean;
  size: "small" | "medium" | "large";
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, size, onChange }) => {
  return (
    <label className={`${styles["switch"]} ${styles[size]}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label="Toggle switch"
      />
      <span className={styles["slider"]}></span>
    </label>
  );
};