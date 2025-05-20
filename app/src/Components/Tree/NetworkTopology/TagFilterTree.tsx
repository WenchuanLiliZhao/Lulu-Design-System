import { Btn } from "../../SmallElements/Btn";
import React, { useState } from "react";
import styles from "./TagFilterTree.module.scss";
import { Icon } from "../../Icon";

interface TagFilterProps {
  tagTree: string[][];
  renderFromLevel: number;
}

export const NodeTagPrefix = "node-tag-";

export const TagFilterTree: React.FC<TagFilterProps> = ({
  tagTree,
  renderFromLevel,
}) => {
  // Track visibility state for each tag (true means visible, false means hidden)
  const [tagVisibility, setTagVisibility] = useState<Record<string, boolean>>(
    {}
  );

  // Function to toggle visibility of elements with tag
  const toggleTagVisibility = (tag: string) => {
    // Find all elements with the class name matching the tag
    const elements = document.getElementsByClassName(`${NodeTagPrefix}-${tag}`);

    // Get current visibility (default to true if not set)
    const currentVisibility = tagVisibility[tag] !== false;
    // Toggle the visibility in state
    const newVisibility = !currentVisibility;
    setTagVisibility({ ...tagVisibility, [tag]: newVisibility });

    // Apply or remove hidden class based on visibility state
    Array.from(elements).forEach((element) => {
      if (newVisibility) {
        // If new state is visible, remove hidden class
        element.classList.remove(`${tag}-target-hidden`);
      } else {
        // If new state is not visible, add hidden class
        element.classList.add(`${tag}-target-hidden`);
      }
    });
  };

  const toggleIsTarget = (tag: string, isTarget: boolean) => {
    const elements = document.getElementsByClassName(`${NodeTagPrefix}-${tag}`);

    if (isTarget) {
      Array.from(elements).forEach((element) => {
        element.classList.add(styles["is-target"]);
      });
    } else {
      Array.from(elements).forEach((element) => {
        element.classList.remove(styles["is-target"]);
      });
    }
  };

  return (
    <div className={styles["tag-filter-tree"]}>
      {tagTree.map((group: string[], i: number) => {
        return (
          <React.Fragment key={i}>
            {i >= renderFromLevel && (
              <div className={styles["group"]}>
                {group.map((tag: string, j: number) => {
                  // Get current visibility (default to true if not set)
                  const isVisible = tagVisibility[tag] !== false;
                  return (
                    <div className={styles["tag-item"]} key={j}>
                      <div className={styles["level-markers"]}>
                        {/* Only render dividers if not the last level */}
                        {i > renderFromLevel &&
                          i < tagTree.length &&
                          Array.from({ length: i - renderFromLevel }).map(
                            (_, index) => (
                              <div
                                key={`level-${index}`}
                                className={styles["level-marker"]}
                              ></div>
                            )
                          )}
                      </div>
                      <div
                        className={`${styles["tag-info"]} ${
                          isVisible ? "" : styles["tag-info-hidden"]
                        }`}
                        onClick={() => toggleTagVisibility(tag)}
                        onMouseEnter={() => toggleIsTarget(tag, true)}
                        onMouseLeave={() => toggleIsTarget(tag, false)}
                      >
                        <div className={styles["tag-label"]}>
                          <div className={styles["tag-icon-container"]}>
                            <Icon className={styles["tag-icon"]} icon="tag" />
                          </div>
                          <div className={styles["tag-name"]}>{tag}</div>
                        </div>
                        <Btn
                          className={styles["tag-btn"]}
                          icon={isVisible ? "visibility" : "visibility_off"}
                          size={"size-tiny"}
                          mode={"mode-plain"}
                          onClick={() => toggleTagVisibility(tag)}
                          onMouseEnter={() => toggleIsTarget(tag, true)}
                          onMouseLeave={() => toggleIsTarget(tag, false)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
