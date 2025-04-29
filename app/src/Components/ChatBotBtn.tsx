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
            Jira 例开一个 taskundefinedーケーア，ミンゴー！这是 chatbox
            的占位。我不确定这个 chatbox
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
