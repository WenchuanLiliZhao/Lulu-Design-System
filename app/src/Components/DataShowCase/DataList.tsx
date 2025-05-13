import styles from "./DataList.module.scss";
import { HoverBox } from "../SmallElements/HoverBox";
import { FormattedDate } from "../../Functions/FormattedDate";
import { PageIcon, PageShape } from "../../ObjectShapes/PageShape";

/* 
## Component Overview
- The `DataList` component is a React functional component designed to display a list of data items. 
- It supports three display modes: "simplified", "semi-detailed", and "detailed".
- When the list is empty, it renders a friendly placeholder message with an image and text.
- Each data item is rendered as a clickable link, displaying its title, an optional icon, and a formatted date (depending on the display mode).

### Key Implementation Challenges
- **Dynamic Rendering Based on Props**: The component dynamically adjusts its layout and content based on the `displayMode` prop, requiring careful conditional rendering logic.
- **Styling and Responsiveness**: The component relies on modular SCSS styles for consistent and responsive design, ensuring proper alignment and spacing across different display modes.

## 组件功能概览
- `DataList` 是一个 React 函数组件，用于展示数据项列表。
- 支持三种显示模式："简化"、"半详细" 和 "详细"。
- 当列表为空时，会渲染一个友好的占位消息，包括图片和文本。
- 每个数据项以可点击链接的形式展示，显示标题、可选图标，以及格式化日期（取决于显示模式）。

### 主要实现难点
- **基于属性的动态渲染**：组件根据 `displayMode` 属性动态调整布局和内容，需要精心设计条件渲染逻辑。
- **样式和响应式设计**：组件依赖模块化 SCSS 样式，确保在不同显示模式下的一致性和响应式设计。
*/

export interface DataListProps {
  list: PageShape[];
  displayMode: "simplified" | "semi-detailed" | "detailed";
}

export const DataList: React.FC<DataListProps> = ({ list, displayMode }) => {
  // Check if the list is empty and render a placeholder message if true
  // 检查列表是否为空，如果为空则渲染占位消息
  if (list.length === 0) {
    return (
      <div className={styles["data-list-empty"]}>
        <div className={styles["hint"]}>
          {/* Render an image as part of the placeholder */}
          {/* 渲染一张图片作为占位内容的一部分 */}
          <img
            className={styles["img"]}
            src="https://doodleipsum.com/800x450/flat?i=9b838476dba0a936cd163213a1d7d34c"
            alt="No data available"
          />
          <div className={styles["text"]}>
            {/* Render a title and subtitle for the placeholder */}
            {/* 渲染占位内容的标题和副标题 */}
            <p className={styles["title"]}>Ops, no data available!</p>

            <p className={styles["subtitle"]}>              No data, you can clock out now. There's a beautiful pot of flowers waiting for you at home!            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render the list of data items
  // 渲染数据项列表
  return (
    <div className={styles["data-list"]}>
      {list.map((dataElement: PageShape, index: number) => (
        <a
          href={`/${dataElement.info.slug}`}
          className={`${styles["data-list-item"]}`}
          key={index}
        >
          <div className={styles["header"]}>
            <div className={styles["data-title-container"]}>
              {/* Render an icon for the data item */}
              {/* 为数据项渲染一个图标 */}
              <span className={`${styles["marker"]} ${styles["icon"]}`}>
                <PageIcon icon={dataElement.info.type} />
              </span>

              {/* Render the title of the data item */}
              {/* 渲染数据项的标题 */}
              <span className={styles["data-title"]}>
                {dataElement.info.title}
              </span>
            </div>
            {displayMode !== "simplified" && (
              <div className={styles["date"]}>
                {/* Render the formatted date if the display mode is not "simplified" */}
                {/* 如果显示模式不是 "简化"，则渲染格式化日期 */}
                <FormattedDate date={dataElement.info.date} />
              </div>
            )}
          </div>

          {/* Render a hover effect for the data item */}
          {/* 为数据项渲染悬停效果 */}
          <HoverBox mode={"default"} />
        </a>
      ))}
    </div>
  );
};
