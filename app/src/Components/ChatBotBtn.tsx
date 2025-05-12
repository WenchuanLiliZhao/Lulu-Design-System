/* 
## Component Overview
- `ChatBotBtn` is a React functional component designed to render a chatbot button with a toggleable chatbox.
- The button displays different symbols (🤖 and 🧠) based on the open/close state of the chatbox.
- The chatbox includes a placeholder message and supports click-outside functionality to close the chatbox.

### Key Implementation Challenges
- **State Management**: Uses `useState` to manage the open/close state of the chatbox.
- **Click-Outside Detection**: Implements `useRef` and `useEffect` to detect clicks outside the chatbox and close it accordingly.
- **Event Listener Cleanup**: Ensures proper cleanup of `mousedown` event listeners to avoid memory leaks.

---

## 组件功能概览
- `ChatBotBtn` 是一个 React 函数组件，用于渲染一个带有可切换聊天框的聊天机器人按钮。
- 按钮根据聊天框的打开/关闭状态显示不同的符号（🤖 和 🧠）。
- 聊天框包含占位消息，并支持点击外部区域关闭聊天框的功能。

### 主要实现难点
- **状态管理**：使用 `useState` 管理聊天框的打开/关闭状态。
- **点击外部检测**：通过 `useRef` 和 `useEffect` 实现点击聊天框外部区域时关闭聊天框的功能。
- **事件监听器清理**：确保对 `mousedown` 事件监听器的正确清理，避免内存泄漏。
*/


import { useState, useEffect, useRef } from "react";
import styles from "./ChatBotBtn.module.scss";
import { HoverBox } from "./SmallElements/HoverBox";
// import { Icon } from './Icon';

export const ChatBotBtn = () => {
  // Manage the open/close state of the chatbox
  // 管理聊天框的打开/关闭状态
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the chatbox container for detecting outside clicks
  // 聊天框容器的引用，用于检测外部点击
  const chatboxRef = useRef<HTMLDivElement>(null);

  // Toggle the chatbox open/close state
  // 切换聊天框的打开/关闭状态
  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  // Handle clicks outside the chatbox to close it
  // 处理聊天框外部的点击事件以关闭聊天框
  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatboxRef.current &&
      !chatboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Add and clean up the event listener for outside clicks
  // 添加和清理用于检测外部点击的事件监听器
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["chatbot-btn"]} ref={chatboxRef}>
      {/* Render the button to toggle the chatbox */}
      {/* 渲染用于切换聊天框的按钮 */}
      <div className={styles["btn"]} onClick={toggleChatbox}>
        {/* Display the 🤖 symbol when the chatbox is closed */}
        {/* 当聊天框关闭时显示 🤖 符号 */}
        <div
          className={`${styles["symbol"]}  ${
            isOpen !== true ? styles["show"] : ""
          }`}
        >
          🤖
        </div>
        {/* Display the 🧠 symbol when the chatbox is open */}
        {/* 当聊天框打开时显示 🧠 符号 */}
        <div className={`${styles["symbol"]} ${isOpen ? styles["show"] : ""}`}>
          🧠
        </div>

        {/* Render a hover effect for the button */}
        {/* 渲染按钮的悬停效果 */}
        <HoverBox mode={"default"} />
      </div>
      <div className={`${styles["chatbox-container"]}`}>
        {/* Render the chatbox with a placeholder message */}
        {/* 渲染带有占位消息的聊天框 */}
        <div className={`${styles["chatbox"]} ${isOpen ? styles["open"] : ""}`}>
          <div className={styles["to-you"]}>
            オケーア，アミンゴー！这是 chatbox 的占位。我不确定这个 chatbox
            的样式能多大程度地自定义。如果可以的话，请给我在 Jira 里开一个
            task，并在 task description
            里大致告诉我需要我在设计图中提供一些什么。不过，这个功能的易用性基本已经到位了，因此优先级很低——但这不妨碍我们在
            Jira 例开一个 task！<br />
            —— 文川·莉莉·赵
          </div>
        </div>
      </div>
    </div>
  );
};
