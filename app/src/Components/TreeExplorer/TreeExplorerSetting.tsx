import React from "react";
import styles from "./TreeExplorerSetting.module.scss";

interface TreeExplorerSettingProps {
  items: React.ReactNode[][];
}

const TreeExplorerSetting: React.FC<TreeExplorerSettingProps> = ({ items }) => {
  return (
    <div className={styles["tree-explorer-setting"]}>
      {items.map((column, columnIndex) => (
        <div key={columnIndex} className={styles["setting-item-column"]}>
          {column.map((item, itemIndex) => (
            <div key={itemIndex} className={styles["setting-item"]}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TreeExplorerSetting;
