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
