/*
# About this Component

## Overview

- **Primary Functionality**: `MessageBox` is a message display component used to show grouped message lists and supports filtering by unread status.

- **Sub-Features**:
  1. Group messages by time (e.g., Today, Yesterday, This Week, etc.).
  2. Toggle to show only unread messages.
  3. Format message timestamps into relative time (e.g., "5 minutes ago").
  4. Provide hover interaction for messages.
  5. Close the dropdown when clicking outside or on specific elements with the class name imported from `ClickToClose`.

## Notes & Challenges

- **Time Grouping Logic**: Requires dynamically calculating groups based on message timestamps to ensure accuracy.
- **Performance Optimization**: Filtering and grouping logic may need optimization for large message lists to avoid performance bottlenecks.
- **Styling**: Needs to dynamically apply different styles based on the read/unread status of messages.
- **Dropdown Behavior**: Relies on the `Dropdown` component's class name imported from `ClickToClose` to manage dropdown visibility.

## Additional Information

- **Design Intent**: The component aims to provide a clear message display and filtering functionality to enhance user experience.
- **Known Issues**: The current time grouping logic assumes the `ago` property of messages is always accurate, which may require additional validation mechanisms.
*/

/*
# 关于这个组件

## 简介

- **主要功能**：`MessageBox` 是一个消息展示组件，用于显示分组的消息列表，并支持按未读状态筛选。

- **子功能**：
  1. 按时间分组消息（如今天、昨天、本周等）。
  2. 支持切换是否仅显示未读消息。
  3. 格式化消息的时间显示为相对时间（如“5分钟前”）。
  4. 提供消息的悬停交互功能。
  5. 点击外部或带有由 `ClickToClose` 所导入的类名的特定元素时关闭下拉菜单。

## 注意 & 实现难点

- **时间分组逻辑**：需要根据消息的时间戳动态计算分组，确保分组准确性。
- **性能优化**：当消息列表较大时，可能需要优化筛选和分组逻辑以避免性能瓶颈。
- **样式处理**：需要根据消息的已读/未读状态动态应用不同的样式。
- **下拉菜单行为**：依赖 `Dropdown` 组件中由 `ClickToClose` 所导入的类名来管理下拉菜单的可见性。

## 其他

- **设计意图**：组件旨在提供清晰的消息展示和筛选功能，提升用户体验。
- **已知问题**：目前的时间分组逻辑假设消息的 `ago` 属性始终准确，可能需要额外的校验机制。
*/

import React, { useState } from "react";
import { HoverBox } from "./HoverBox";
import styles from "./MessageBox.module.scss";
import { Switch } from "./Switch";
import { ClickToClose } from "./Dropdown";
import { MessageType } from "../Types/MessageTypes";

interface MessageBoxProps {
  title: string;
  messageList: MessageType[];
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  title,
  messageList,
}) => {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredMessages = showUnreadOnly
    ? messageList.filter((message) => !message.read)
    : messageList;

  const groupedMessages = groupMessagesByTime(filteredMessages);

  return (
    <div className={styles["message-box"]}>
      <div className={styles["box-title-bar"]}>
        <div className={styles["box-title"]}>{title}</div>
        <div className={styles["box-option-container"]}>
          <div className={styles["box-switch"]}>
            <span className={styles["label"]}>Only show unread</span>
            <Switch
              checked={showUnreadOnly}
              onChange={setShowUnreadOnly}
              size={"small"}
            />
          </div>
        </div>
      </div>

      <div className={styles["message-list"]}>
        {Object.entries(groupedMessages)
          .filter(([, messages]) => messages.length > 0)
          .map(([group, messages]) => (
            <div key={group} className={styles["message-group"]}>
              <div className={styles["group-title"]}>{group}</div>{" "}
              {/* Group message with time; eg., today, this week */}
              {messages.map((message, i) => (
                // ===================
                // Begin: Message item
                <div
                  key={i}
                  className={`${styles["message"]} ${
                    message.read ? styles["read"] : styles["unread"]
                  }`}
                >
                  <div className={styles["message-header"]}>
                    <div className={`${styles["message-mark"]} ${message.read ? styles["read"] : styles["unread"]}`}>
                    </div>
                    <div className={styles["message-avatar"]}>
                      <img
                        src={message.from.avatar}
                        alt={message.from.name}
                        className={styles["avatar"]}
                      />
                    </div>
                  </div>
                  <div className={styles["message-content"]}>
                    <div className={styles["message-title"]}>
                      {message.title}
                    </div>
                    <div className={styles["message-text"]}>
                      {message.message}
                    </div>
                    <div className={styles["message-time"]}>
                      {formatAgo(message.ago)}
                    </div>
                  </div>
                  <HoverBox mode={"default"} className={`${ClickToClose}`} />
                </div>
                // End: Message item
                // =================
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

// Helper function to group messages by time
// 辅助函数：按时间分组消息（如今天、昨天、本周等）
const groupMessagesByTime = (messages: MessageType[]) => {
  const now = new Date();
  const groups: Record<string, MessageType[]> = {
    Today: [], // Today group (今天分组)
    Yesterday: [], // Yesterday group (昨天分组)
    "This Week": [], // This Week group (本周分组)
    "This Month": [], // This Month group (本月分组)
    "This Year": [], // This Year group (今年分组)
    Older: [], // Older group (更早分组)
  };

  messages.forEach((message) => {
    const messageDate = new Date();
    messageDate.setMinutes(messageDate.getMinutes() - message.ago);

    const diffInDays = Math.floor(
      (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      groups["Today"].push(message); // 分组到“今天”
    } else if (diffInDays === 1) {
      groups["Yesterday"].push(message); // 分组到“昨天”
    } else if (diffInDays <= 7) {
      groups["This Week"].push(message); // 分组到“本周”
    } else if (diffInDays <= 30) {
      groups["This Month"].push(message); // 分组到“本月”
    } else if (diffInDays <= 365) {
      groups["This Year"].push(message); // 分组到“今年”
    } else {
      groups["Older"].push(message); // 分组到“更早”
    }
  });

  return groups;
};

// Helper function to format the "ago" property
const formatAgo = (minutesAgo: number): string => {
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (minutesAgo < 1440) {
    const hours = Math.floor(minutesAgo / 60);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else {
    const days = Math.floor(minutesAgo / 1440);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }
};
