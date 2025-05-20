import React from "react";
import { Dropdown } from "../../../Dropdown/Dropdown";
import { Btn } from "../../../SmallElements/Btn";
import { TopologyShortKeyList } from "./TopologyShortKeys";
import styles from "./TopologyToolHints.module.scss";

const DropdownContent = () => {
  return (
    <div className={styles["dropdown-content"]}>
      {TopologyShortKeyList.map((item, i: number) => (
        <React.Fragment key={i}>
          {item.isToolTip && (
            <div className={styles["dropdown-item"]}>
              <div className={styles["dropdown-item-key"]}>
                {item.shortKeyText}
              </div>
              <div className={styles["dropdown-item-description"]}>
                {item.description}
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const TopologyToolHints = () => {
  return (
    <div className={styles["dropdown-container"]}>
      <Dropdown
        trigger={<Btn icon={"info"} size={"size-medium"} mode={"mode-plain"} />}
        dropdownContent={<DropdownContent />}
        dropdownSize={"small"}
        position={"right"}
      />
    </div>
  );
};
