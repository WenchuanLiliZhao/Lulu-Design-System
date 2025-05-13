import { Icon } from "../Icon";
import styles from "./CheckBox.module.scss";
import React from "react";

interface CheckboxInputProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxInputProps> = ({ checked, onChange }) => {
  return (
    <div
    className={`${styles["checkbox"]} ${checked && styles["checked"]}`}
      role="checkbox"
      aria-checked={checked}
      aria-label={checked ? "Checked" : "Unchecked"}
      tabIndex={0}
      
      onClick={onChange}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange();
        }
      }}
    >
      {checked && <Icon icon={"check"} className={styles["checkbox-icon"]} />}
    </div>
  );
};

interface CheckboxLabelProps {
  id: string;
  text: string;
  checked: boolean;
  onToggle: (id: string) => void;
}

export const CheckboxLabel: React.FC<CheckboxLabelProps> = ({
  id,
  text,
  checked,
  onToggle,
}) => {
  return (
    <div className={styles["checkbox-label"]}>
      <Checkbox checked={checked} onChange={() => onToggle(id)} />
      <div className={styles["checkbox-label-text"]}>{text}</div>
    </div>
  );
};
