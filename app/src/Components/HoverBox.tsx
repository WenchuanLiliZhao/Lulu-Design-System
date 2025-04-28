import React from "react";
import styles from "./HoverBox.module.scss";

interface HoverBoxProps {
  mode: "default" | "darken";
  className?: string;
}

export const HoverBox: React.FC<HoverBoxProps> = ({ mode, className }) => {
  return (
    <div className={`${styles["hover-box"]} ${className} ${styles[mode]}`}></div>
  )
}