/* 
## Component Overview
- The `SearchBar` component is a React functional component designed to provide a search input field with optional grouped search hints.
- It supports dynamic rendering of search hints based on the `searchHintGroups` prop, which allows for categorized suggestions.
- It includes features such as focus state management and keyboard interaction (e.g., triggering a search on pressing "Enter").

### Key Implementation Challenges
- **Dynamic Hint Rendering**: The component dynamically renders search hints grouped by categories. Each group includes a title and a list of clickable items, requiring careful handling of nested structures.
- **Focus and Blur Management**: The component manages focus and blur states to control the visibility of the hint box, ensuring a smooth user experience.

## 组件功能概览
- `SearchBar` 是一个 React 函数组件，用于提供带有可选分组搜索提示的搜索输入框。
- 支持根据 `searchHintGroups` 属性动态渲染搜索提示，允许按类别显示建议。
- 包括焦点状态管理和键盘交互功能（例如按下 "Enter" 键触发搜索）。

### 主要实现难点
- **动态提示渲染**：组件根据类别动态渲染搜索提示。每个类别包括一个标题和一组可点击的项目，需要精心处理嵌套结构。
- **焦点与失焦管理**：组件管理焦点和失焦状态，以控制提示框的可见性，确保流畅的用户体验。
*/

import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { Icon } from "./Icon";
import { SearchHintGroupType } from "../Types/SearchHintType";
import { Page } from "../Types/PageType";
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
      <Icon icon={"search"} />
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

      {/* 这个地方的 scss 我单独处理，因为可能需要调换位置 */}
      {searchHintGroups !== undefined && (
        <div
          className={`${styles["hint-box"]} ${
            isFocused ? styles["focused"] : ""
          }`}
        >
          {searchHintGroups.map((group, i: number) => (
            <div key={i} className={styles["hint-group"]}>
              <div className={styles["hint-group-title"]}>
                {group.groupTitle}
              </div>
              <div className={styles["hint-list"]}>
                {group.hintList.length > 0 &&
                  group.hintList.map((item: Page, k: number) => (
                    <div key={k} className={styles["hint-item"]}>
                      <Icon className={styles["icon"]} icon={item.info.icon ? item.info.icon : "description" } />
                      <span>{item.info.title}</span>
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
