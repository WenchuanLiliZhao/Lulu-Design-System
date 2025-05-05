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
import { HoverBox } from "./HoverBox";
// import { Icon } from './Icon';

export const ChatBotBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      chatboxRef.current &&
      !chatboxRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["chatbot-btn"]} ref={chatboxRef}>
      <div className={styles["btn"]} onClick={toggleChatbox}>
        <div
          className={`${styles["symbol"]}  ${
            isOpen !== true ? styles["show"] : ""
          }`}
        >
          🤖
        </div>
        <div className={`${styles["symbol"]} ${isOpen ? styles["show"] : ""}`}>
          🧠
        </div>

        <HoverBox mode={"default"} />
      </div>
      <div className={`${styles["chatbox-container"]}`}>
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
