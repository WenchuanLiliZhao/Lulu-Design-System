import React, { useState } from "react";
import { HoverBox } from "./HoverBox";
import styles from "./MessageBox.module.scss";
import { Switch } from "./Switch";
import { ClickToClose } from "./Dropdown";

interface MessageProps {
  title: string;
  message: string;
  ago: number; // Number of minutes ago
  read: boolean; // New property to indicate if the message has been read
}

interface MessageBoxProps {
  title: string;
  messageList: MessageProps[];
}

export const MessageBox: React.FC<MessageBoxProps> = ({
  title,
  messageList,
}) => {
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredMessages = showUnreadOnly
    ? messageList.filter((message) => !message.read)
    : messageList;

  return (
    <div className={styles["message-box"]}>
      <div className={styles["box-title-bar"]}>
        <div className={styles["box-title"]}>{title}</div>
        <div>
          <span>Only show unread</span>
          <Switch
            checked={showUnreadOnly}
            onChange={setShowUnreadOnly}
            size={"small"}
          />
        </div>
      </div>

      <div className={styles["message-list"]}>
        {filteredMessages.map((message, i: number) => (
          <div
            key={i}
            className={`${styles["message"]} ${
              message.read ? styles["read"] : styles["unread"]
            }`}
          >
            <div className={styles["message-title"]}>{message.title}</div>
            <div className={styles["message-text"]}>{message.message}</div>
            <div className={styles["message-time"]}>
              {formatAgo(message.ago)}
            </div>
            <HoverBox mode={"default"} className={`${ClickToClose}`} />
          </div>
        ))}
      </div>
    </div>
  );
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

export const Example_Messages: MessageProps[] = [
  {
    title: "System Update",
    message: "Your system has been updated successfully.",
    ago: 5,
    read: true,
  },
  {
    title: "New Message",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis minus aperiam repudiandae consequuntur ut quaerat soluta impedit nihil, sed ullam necessitatibus veritatis eaque, unde sit nesciunt dicta corporis, dolorem voluptates.",
    ago: 10,
    read: false,
  },
  {
    title: "Payment Received",
    message: "Your payment of $50 has been received.",
    ago: 30,
    read: true,
  },
  {
    title: "Reminder",
    message: "Don't forget your meeting at 3 PM.",
    ago: 60,
    read: false,
  },
  {
    title: "Friend Request",
    message: "Anna has sent you a friend request.",
    ago: 120,
    read: false,
  },
  {
    title: "Password Changed",
    message: "Your password was changed successfully.",
    ago: 180,
    read: true,
  },
  {
    title: "New Comment",
    message: "Someone commented on your post.",
    ago: 240,
    read: false,
  },
  {
    title: "Subscription Expiring",
    message: "Your subscription will expire in 3 days.",
    ago: 360,
    read: true,
  },
  {
    title: "Event Invitation",
    message: "You are invited to the annual gala.",
    ago: 480,
    read: false,
  },
  {
    title: "Security Alert",
    message: "A login attempt was detected from a new device.",
    ago: 600,
    read: true,
  },
  {
    title: "Delivery Update",
    message: "Your package is out for delivery.",
    ago: 720,
    read: false,
  },
  {
    title: "Achievement Unlocked",
    message: "You reached a new milestone!",
    ago: 1440,
    read: true,
  },
  {
    title: "System Maintenance",
    message: "Scheduled maintenance will occur at midnight.",
    ago: 2880,
    read: true,
  },
  {
    title: "New Follower",
    message: "You have a new follower on your profile.",
    ago: 4320,
    read: false,
  },
  {
    title: "Weekly Summary",
    message: "Here’s your activity summary for the week.",
    ago: 5760,
    read: true,
  },
  {
    title: "Promotion Alert",
    message: "Get 20% off on your next purchase!",
    ago: 7200,
    read: false,
  },
  {
    title: "Bug Report",
    message: "A bug you reported has been resolved.",
    ago: 8640,
    read: true,
  },
  {
    title: "Account Verification",
    message: "Your account has been successfully verified.",
    ago: 10080,
    read: true,
  },
  {
    title: "Survey Request",
    message: "We’d love your feedback on our service.",
    ago: 20160,
    read: false,
  },
  {
    title: "Welcome!",
    message: "Thank you for joining our platform.",
    ago: 43200,
    read: true,
  },
];
