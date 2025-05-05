/* 
## Component Overview
- The `Menu` component is a React functional component designed to render a menu with grouped items.
- Each group can have an optional title (`groupTitle`) and a list of items (`groupItems`), where each item can include an icon, text, and an optional click handler (`onClick`).

### Key Implementation Challenges
- **Dynamic Rendering of Groups and Items**: The component dynamically renders menu groups and their items based on the `items` prop, requiring careful handling of nested structures.
- **Cross-Component Interaction**: 
  - The `ClickToClose` class from `Dropdown.tsx` is applied to enable dropdown-like behavior, allowing the menu to close when clicking outside.

## 组件功能概览
- `Menu` 是一个 React 函数组件，用于渲染带有分组的菜单。
- 每个分组可以包含一个可选标题（`groupTitle`）和一组菜单项（`groupItems`），每个菜单项可以包括图标、文本以及一个可选的点击事件处理器（`onClick`）。

### 主要实现难点
- **分组和菜单项的动态渲染**：组件根据 `items` 属性动态渲染菜单分组及其项，需要精心处理嵌套结构。
- **跨组件交互**：
  - 应用来自 `Dropdown.tsx` 的 `ClickToClose` 类，实现类似下拉菜单的行为，支持点击外部关闭菜单。
*/

import { ClickToClose } from "./Dropdown";
import { HoverBox } from "./HoverBox";
import { Icon } from "./Icon";
import styles from "./Menu.module.scss";

export interface MenuProps {
  items: {
    groupTitle?: string;
    groupItems: {
      icon?: string;
      text: string;
      onClick?: () => void;
    }[];
  }[];
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({ items, className }) => {
  return (
    <div className={`${styles["menu"]} ${className}`}>
      {Object.values(items).map((group, i) => (
        <div key={i} className={styles["group"]}>
          {group.groupTitle && (
            <>
              <div className={`${styles["group-title"]} ${styles["cell"]}`}>
                {group.groupTitle}
              </div>
            </>
          )}
          <div className={styles["items"]}>
            {group.groupItems.map((item, j) => (
              <div key={j} className={`${styles["item"]} ${styles["cell"]}`} onClick={item.onClick}>
                {item.icon && <Icon className={styles["icon"]} icon={item.icon} />}
                {item.text}
                <HoverBox mode={"default"} className={ClickToClose} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

