/* 
## Component Overview
- The `SearchBar` component is a React functional component designed to provide a search input field with optional grouped search hints.
- It supports dynamic rendering of search hints based on the `searchHintGroups` prop, which allows for categorized suggestions.
- The component includes features such as focus state management, keyboard interaction (e.g., triggering a search on pressing "Enter"), and conditional rendering of hints when the input is empty.

### Key Implementation Challenges
- **Dynamic Hint Rendering**: The component dynamically renders search hints grouped by categories. Each group includes a title and a list of clickable items, requiring careful handling of nested structures and conditional rendering logic.
- **Focus and Blur Management**: The component manages focus and blur states to control the visibility of the hint box, ensuring a smooth user experience.
- **Conditional Hint Display**: The search hints are displayed only when the input field is empty, requiring precise state management to toggle the visibility of the hint box.
- **Keyboard Interaction**: The component listens for the "Enter" key to trigger the search action, ensuring seamless user interaction.

## 组件功能概览
- `SearchBar` 是一个 React 函数组件，用于提供带有可选分组搜索提示的搜索输入框。
- 支持根据 `searchHintGroups` 属性动态渲染搜索提示，允许按类别显示建议。
- 组件包括焦点状态管理、键盘交互（例如按下 "Enter" 键触发搜索）以及在输入框为空时条件渲染提示的功能。

### 主要实现难点
- **动态提示渲染**：组件根据类别动态渲染搜索提示。每个类别包括一个标题和一组可点击的项目，需要精心处理嵌套结构和条件渲染逻辑。
- **焦点与失焦管理**：组件管理焦点和失焦状态，以控制提示框的可见性，确保流畅的用户体验。
- **条件提示显示**：仅当输入框为空时显示搜索提示，需要精确的状态管理来切换提示框的可见性。
- **键盘交互**：组件监听 "Enter" 键以触发搜索操作，确保用户交互的流畅性。
*/

import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { Icon } from "./Icon";
import { SearchHintGroupType } from "../ObjectShapes/SearchHintShape";
import { PageShape } from "../ObjectShapes/PageShape";
import { HoverBox } from "./HoverBox";

type SearchBarProps = {
  placeholder?: string;
  place?: "default" | "on-nav";
  searchHintGroups?: SearchHintGroupType[];
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  place = "default",
  searchHintGroups,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(query);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`${styles["search-bar"]} ${styles[place]} ${
        isFocused ? styles["focused"] : ""
      }`}
    >
      {/* Render a search icon */}
      {/* 渲染一个搜索图标 */}
      <Icon icon={"search"} />

      {/* Render the input field for search queries */}
      {/* 渲染用于搜索查询的输入框 */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={styles.input}
      />

      {/* Render the hint box if searchHintGroups are provided and query is empty */}
      {/* 如果提供了 searchHintGroups 且 query 为空，则渲染提示框 */}
      {searchHintGroups !== undefined && query === "" && (
        <div
          className={`${styles["hint-box"]} ${
            isFocused ? styles["focused"] : ""
          }`}
        >
          {/* Render each group of search hints */}
          {/* 渲染每个搜索提示分组 */}
          {searchHintGroups.map((group, i: number) => (
            <div key={i} className={styles["hint-group"]}>
              {/* Render the title of the hint group */}
              {/* 渲染提示分组的标题 */}
              <div className={styles["hint-group-title"]}>
                {group.groupTitle}
              </div>
              <div className={styles["hint-list"]}>
                {/* Render each hint item in the group */}
                {/* 渲染分组中的每个提示项 */}
                {group.hintList.length > 0 &&
                  group.hintList.map((item: PageShape, k: number) => (
                    <div key={k} className={styles["hint-item"]}>
                      {/* Render the icon for the hint item */}
                      {/* 渲染提示项的图标 */}
                      <Icon
                        className={styles["icon"]}
                        icon={item.info.type ? item.info.type : "description"}
                      />
                      {/* Render the title of the hint item */}
                      {/* 渲染提示项的标题 */}
                      <span>{item.info.title}</span>
                      {/* Render a hover effect for the hint item */}
                      {/* 为提示项渲染悬停效果 */}
                      <HoverBox />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
