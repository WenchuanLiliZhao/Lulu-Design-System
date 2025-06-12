/* 
## Component Overview
- `MetadataList` is a React component designed to display metadata items in a detailed format.
- Each item shows ID, metadata name, metadata type, and timestamp (favorite/subscription time).
- Matches the format shown in the screenshot with proper styling and layout.

### Key Implementation Challenges
- **Detailed Information Display**: Shows comprehensive metadata including ID, name, type, and timestamps
- **Time Label Flexibility**: Supports both favorite time and subscription time display
- **Interactive Elements**: Includes cancel/remove functionality for each item

## 组件功能概览
- `MetadataList` 是一个 React 组件，用于以详细格式显示元数据项。
- 每个项目显示 ID、元数据名称、元数据类型和时间戳（收藏/订阅时间）。
- 匹配截图中显示的格式，具有正确的样式和布局。

### 主要实现难点
- **详细信息显示**：显示包括 ID、名称、类型和时间戳在内的全面元数据
- **时间标签灵活性**：支持收藏时间和订阅时间的显示
- **交互元素**：为每个项目包含取消/删除功能
*/

import React from "react";
import styles from "./MetadataList.module.scss";
import { PageShape } from "../../ObjectShapes/PageShape";
import { Btn } from "../SmallElements/Btn";
// import { HoverBox } from "../SmallElements/HoverBox";

export interface MetadataListProps {
  list: PageShape[];
  listType: "favorites" | "subscriptions"; // 用于确定显示的时间标签
}

export const MetadataList: React.FC<MetadataListProps> = ({ list, listType }) => {
  if (list.length === 0) {
    return (
      <div className={styles["metadata-list-empty"]}>
        <div className={styles["hint"]}>
          <img
            className={styles["img"]}
            src="https://doodleipsum.com/800x450/flat?i=9b838476dba0a936cd163213a1d7d34c"
            alt="No data available"
          />
          <div className={styles["text"]}>
            <p className={styles["title"]}>暂无数据</p>
            <p className={styles["subtitle"]}>
              {listType === "favorites" ? "您还没有收藏任何项目" : "您还没有订阅任何项目"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["metadata-list"]}>
      {list.map((item: PageShape, index: number) => {
        const metadata = item.info.metadata;
        if (!metadata) return null;

        const timeLabel = listType === "favorites" ? "收藏时间" : "订阅时间";
        const timeValue = listType === "favorites" ? metadata.favoriteTime : metadata.subscriptionTime;

        return (
          <div key={index} className={styles["metadata-item"]}>
            <div className={styles["metadata-header"]}>
              <div className={styles["metadata-id"]}>{metadata.id}</div>
              <Btn 
                icon="close"
                size="size-tiny" 
                mode="mode-plain"
                onClick={() => {
                  // TODO: 实现取消功能
                  console.log(`取消 ${listType === "favorites" ? "收藏" : "订阅"}: ${metadata.id}`);
                }}
              />
            </div>
            
            <div className={styles["metadata-info"]}>
              <div className={styles["info-row"]}>
                <span className={styles["info-label"]}>元数据名称：</span>
                <span className={styles["info-value"]}>{metadata.dataName}</span>
              </div>
              
              <div className={styles["info-row"]}>
                <span className={styles["info-label"]}>元数据类型：</span>
                <span className={styles["info-value"]}>{metadata.dataType}</span>
              </div>
              
              <div className={styles["info-row"]}>
                <span className={styles["info-label"]}>{timeLabel}：</span>
                <span className={styles["info-value"]}>{timeValue}</span>
              </div>
            </div>
            
            {/* <HoverBox mode={"default"} /> */}
          </div>
        );
      })}
    </div>
  );
}; 