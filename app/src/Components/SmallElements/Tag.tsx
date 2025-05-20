import styles from "./Tag.module.scss";

import React from "react";
import { TagShape } from "../../ObjectShapes/TagShape";
import { HoverBox } from "./HoverBox";

interface TagProps {
  tag: TagShape;
  size: "small" | "medium" | "large";
}

export const Tag: React.FC<TagProps> = ({ tag, size }) => {
  return (
    <span className={`${styles["tag"]} ${styles[size]}`}>
      {tag.name}
      <HoverBox mode={"default"} />
    </span>
  );
};
