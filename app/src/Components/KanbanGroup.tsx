import React from "react";
import { KanbanType } from "../Types/KanbanType";
import { HoverBox } from "./HoverBox";
import { Icon } from "./Icon";
import styles from "./KanbanGroup.module.scss";
import { useState, useRef } from "react";



export interface KanbanGroupProps {
  title: string;
  kanbanList: KanbanType[];
  style?: React.CSSProperties;
}

export const KanbanGroup: React.FC<KanbanGroupProps> = ({
  title,
  kanbanList,
  style,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const kanbanContentRef = useRef<HTMLDivElement>(null);

  // 👇 The `ref` here is used to reference the DOM element of the kanban content container. This allows programmatic access to the element, such as resetting its scroll position when switching tabs.

  // 👇 这里的 `ref` 用于引用看板内容容器的 DOM 元素。这使得可以通过编程方式访问该元素，例如在切换标签时重置其滚动位置。
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (kanbanContentRef.current) {
      kanbanContentRef.current.scrollTop = 0;
    }
  };

  return (
    <div className={styles["kanban-group"]} style={style}>
      <div className={styles["kanban-group-title"]}>{title}</div>
      <div className={styles["kanban-tabs"]}>
        {kanbanList.map((kanban, index) => (
          <div
            key={index}
            className={
              index === activeTab
                ? `${styles["kanban-tab"]} ${styles["active"]}`
                : styles["kanban-tab"]
            }
            onClick={() => handleTabClick(index)}
          >
            {kanban.icon && (
              <Icon className={styles["icon"]} icon={kanban.icon} />
            )}
            {kanban.title}
            <HoverBox mode={"default"} />
          </div>
        ))}
      </div>

      <div className={styles["kanban-group-content"]} ref={kanbanContentRef}>
        <div className={styles["kanban"]}>
          {kanbanList[activeTab].content}
        </div>
      </div>
    </div>
  );
};
