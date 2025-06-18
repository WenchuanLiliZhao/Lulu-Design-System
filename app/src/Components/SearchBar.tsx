/* 
## Component Overview
- The `SearchBar` component is a React functional component designed to provide a search input field with search history functionality.
- It supports saving search history to localStorage, displaying search history when the input is empty and focused, and clearing search history.
- The component includes features such as focus state management, keyboard interaction (e.g., triggering a search on pressing "Enter"), and click-to-search from history.

### Key Implementation Challenges
- **Search History Management**: The component manages search history using localStorage, automatically saving new searches and limiting to 10 recent searches.
- **Focus and Blur Management**: The component manages focus and blur states to control the visibility of the history box, ensuring a smooth user experience.
- **Conditional History Display**: The search history is displayed only when the input field is empty and focused, requiring precise state management.
- **Keyboard Interaction**: The component listens for the "Enter" key to trigger the search action and automatically saves to history.

## 组件功能概览
- `SearchBar` 是一个 React 函数组件，用于提供带有搜索历史功能的搜索输入框。
- 支持将搜索历史保存到 localStorage，在输入框为空且聚焦时显示搜索历史，并可清除搜索历史。
- 组件包括焦点状态管理、键盘交互（例如按下 "Enter" 键触发搜索）以及从历史记录点击搜索的功能。

### 主要实现难点
- **搜索历史管理**：组件使用 localStorage 管理搜索历史，自动保存新搜索并限制为最近 10 条搜索记录。
- **焦点与失焦管理**：组件管理焦点和失焦状态，以控制历史框的可见性，确保流畅的用户体验。
- **条件历史显示**：仅当输入框为空且聚焦时显示搜索历史，需要精确的状态管理。
- **键盘交互**：组件监听 "Enter" 键以触发搜索操作并自动保存到历史记录。
*/

import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.scss";
import { Icon } from "./Icon";
import { Btn } from "./SmallElements/Btn";
import { Tag } from "./SmallElements/Tag";
import { TagShape } from "../ObjectShapes/TagShape";

type SearchBarProps = {
  placeholder?: string;
  size?: "size-default" | "size-on-nav" | "size-small";
  onSearch: (query: string) => void;
  defaultValue?: string;
};

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 10;

// Default demo search history data
// 默认演示搜索历史数据
const DEFAULT_SEARCH_HISTORY = [
  "Machine Learning",
  "Data Science",
  "Artificial Intelligence", 
  "Big Data Analytics",
  "Neural Networks",
  "Deep Learning",
  "Database Management"
];

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  size = "size-default",
  onSearch,
  defaultValue = "",
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage on component mount
  // 在组件挂载时从 localStorage 加载搜索历史
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    } else {
      // Set default demo data if no history exists
      // 如果没有历史记录则设置默认演示数据
      setSearchHistory(DEFAULT_SEARCH_HISTORY.slice(0, MAX_HISTORY_ITEMS));
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(DEFAULT_SEARCH_HISTORY.slice(0, MAX_HISTORY_ITEMS)));
    }
  }, []);

  // Save search history to localStorage
  // 将搜索历史保存到 localStorage
  const saveSearchHistory = (history: string[]) => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    setSearchHistory(history);
  };

  // Add search query to history
  // 将搜索查询添加到历史记录
  const addToHistory = (searchQuery: string) => {
    if (searchQuery.trim() === "") return;
    
    const updatedHistory = [searchQuery, ...searchHistory.filter(item => item !== searchQuery)]
      .slice(0, MAX_HISTORY_ITEMS);
    saveSearchHistory(updatedHistory);
  };

  // Clear all search history
  // 清除所有搜索历史
  const clearHistory = () => {
    saveSearchHistory([]);
  };

  // Handle search execution
  // 处理搜索执行
  const executeSearch = (searchQuery: string) => {
    if (searchQuery.trim() === "") return;
    
    addToHistory(searchQuery);
    onSearch(searchQuery);
    setIsFocused(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      executeSearch(query);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking on history items
    // 延迟隐藏以允许点击历史记录项
    setTimeout(() => setIsFocused(false), 150);
  };

  // Handle clicking on history tag
  // 处理点击历史标签
  const handleHistoryTagClick = (historyItem: string) => {
    setQuery(historyItem);
    executeSearch(historyItem);
  };

  return (
    <div
      className={`${styles["search-bar"]} ${styles[size]} ${
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

      {/* Render the search history box when input is empty and focused */}
      {/* 在输入框为空且聚焦时渲染搜索历史框 */}
      {query === "" && isFocused && (
        <div
          className={`${styles["hint-box"]} ${
            isFocused ? styles["focused"] : ""
          }`}
        >
          {/* Search history header with clear button */}
          {/* 搜索历史标题和清除按钮 */}
          <div className={styles["history-header"]}>
            <div className={styles["hint-group-title"]}>
              搜索历史
            </div>
            {searchHistory.length > 0 && (
              <Btn
                icon="clear"
                size="size-tiny"
                mode="mode-plain"
                onClick={clearHistory}
                className={styles["clear-btn"]}
              />
            )}
          </div>

          {/* Render search history tags */}
          {/* 渲染搜索历史标签 */}
          <div className={styles["history-tags"]}>
            {searchHistory.length === 0 ? (
              <div className={styles["no-history"]}>
                暂无搜索历史
              </div>
            ) : (
              searchHistory.map((item: string, index: number) => (
                <div 
                  key={index} 
                  className={styles["history-tag-wrapper"]}
                  onClick={() => handleHistoryTagClick(item)}
                >
                  <Tag 
                    tag={{ name: item } as TagShape} 
                    size="medium" 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
