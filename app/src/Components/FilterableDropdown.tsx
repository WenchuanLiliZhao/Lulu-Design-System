/* 
## Component Overview
- The `FilterableDropdown` component is a reusable React component that provides a dropdown menu with a text input for filtering options.
- It supports fuzzy matching to filter the dropdown options dynamically as the user types.
- The dropdown closes automatically when clicking outside of it.
- Includes a callback function to handle the selection of an option.

### Key Implementation Challenges
- Implementing a fuzzy matching algorithm to provide a user-friendly filtering experience.
- Managing the dropdown's open/close state and ensuring it closes when clicking outside the component.
- Handling performance optimizations for filtering large datasets in real-time.
- Ensuring proper state management when interacting with the dropdown, such as handling clicks on options.

## 组件功能概览
- `FilterableDropdown` 是一个可复用的 React 组件，提供带有文本输入框的下拉菜单，用于筛选选项。
- 支持模糊匹配功能，用户输入时动态筛选下拉选项。
- 点击组件外部时，下拉菜单会自动关闭。
- 包含一个回调函数，用于处理选项的选择。

### 主要实现难点
- 实现模糊匹配算法，以提供友好的筛选体验。
- 管理下拉菜单的打开/关闭状态，并确保点击组件外部时菜单关闭。
- 在实时筛选大量数据时进行性能优化。
- 确保在与下拉菜单交互时正确管理状态，例如处理选项点击。
*/

import React, { useState, useRef, useEffect } from "react";
import styles from "./FilterableDropdown.module.scss";

interface FilterableDropdownProps {
  placeholder: string; // Placeholder text for the input
  // 输入框的占位文本
  options: string[]; // List of options to display in the dropdown
  // 下拉菜单中显示的选项列表
  onSelect: (option: string) => void; // Callback when an option is selected
  // 当选中某个选项时触发的回调函数
  defaultSelectedOption?: string; // Optional default selected option
  // 可选的默认选中选项
}

export const FilterableDropdown: React.FC<FilterableDropdownProps> = ({
  placeholder,
  options,
  onSelect,
  defaultSelectedOption,
}) => {
  const [query, setQuery] = useState(defaultSelectedOption || ""); 
  // State to store the current input value
  // 用于存储当前输入值的状态
  const [filteredOptions, setFilteredOptions] = useState(options); 
  // State to store the filtered options
  // 用于存储筛选后的选项的状态
  const [isOpen, setIsOpen] = useState(false); 
  // State to manage the visibility of the dropdown
  // 用于管理下拉菜单可见性的状态
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultSelectedOption || null
  ); 
  // State to store the currently selected option
  // 用于存储当前选中选项的状态
  const [isClickingOption, setIsClickingOption] = useState(false); 
  // State to track if an option is being clicked
  // 用于跟踪是否正在点击选项的状态
  const dropdownRef = useRef<HTMLDivElement>(null); 
  // Ref to detect clicks outside the dropdown
  // 用于检测点击是否发生在下拉菜单外部的引用

  // Fuzzy matching function
  // 模糊匹配函数
  const fuzzyMatch = (input: string, option: string): boolean => {
    const inputLower = input.toLowerCase();
    const optionLower = option.toLowerCase();
    let i = 0;
    for (let j = 0; j < optionLower.length; j++) {
      if (optionLower[j] === inputLower[i]) {
        i++;
      }
      if (i === inputLower.length) {
        return true; // Return true if all characters in the input match sequentially
        // 如果输入中的所有字符按顺序匹配，则返回 true
      }
    }
    return false; // Return false if no match is found
    // 如果未找到匹配项，则返回 false
  };

  // Filter options based on the query using fuzzy matching
  // 使用模糊匹配根据查询筛选选项
  useEffect(() => {
    setFilteredOptions(options.filter((option) => fuzzyMatch(query, option)));
  }, [query, options]);

  // Close dropdown when clicking outside
  // 点击下拉菜单外部时关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown
        // 关闭下拉菜单
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["filterable-dropdown"]} ref={dropdownRef}>
      {/* Input field for filtering options */}
      {/* 用于筛选选项的输入框 */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        // Update query state on input change
        // 在输入更改时更新查询状态
        onFocus={() => {
          setQuery(""); 
          // Clear input text on focus
          // 聚焦时清空输入文本
          setIsOpen(true); 
          // Open dropdown on focus
          // 聚焦时打开下拉菜单
        }}
        onBlur={() => {
          if (isClickingOption) {
            setIsClickingOption(false); 
            // Reset the clicking state
            // 重置点击状态
            return;
          }
          if (selectedOption) {
            setQuery(selectedOption); 
            // Keep the selected option in the input
            // 在输入框中保留选中的选项
          }
        }}
        placeholder={selectedOption || placeholder} 
        // Update placeholder to selected option or default placeholder
        // 将占位符更新为选中的选项或默认占位符
        className={styles["dropdown-input"]}
      />

      {/* Dropdown content */}
      {/* 下拉菜单内容 */}
      {isOpen && (
        <div className={styles["dropdown-content"]}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={styles["dropdown-item"]}
                onMouseDown={() => {
                  setIsClickingOption(true); 
                  // Mark that an option is being clicked
                  // 标记正在点击选项
                }}
                onClick={() => {
                  setSelectedOption(option); 
                  // Set the selected option
                  // 设置选中的选项
                  setQuery(option); 
                  // Set input text to the selected option
                  // 将输入文本设置为选中的选项
                  onSelect(option); 
                  // Trigger the onSelect callback
                  // 触发 onSelect 回调
                  setIsOpen(false); 
                  // Close the dropdown
                  // 关闭下拉菜单
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div className={styles["dropdown-no-options"]}>
              {/* Display message when no options are found */}
              {/* 当未找到选项时显示消息 */}
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
