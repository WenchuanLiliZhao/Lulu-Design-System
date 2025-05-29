import { Btn } from "../../SmallElements/Btn";
import React, { useState } from "react";
import styles from "./TagFilterTree.module.scss";
import { Icon } from "../../Icon";
import { TreeNodesShape } from "../TreeExplorer";

interface TagFilterProps {
  tagTree: string[][];
  renderFromLevel: number;
  mode: "plain" | "tree";
  // Add optional original tree data for tree mode
  originalTreeData?: TreeNodesShape[];
}

export const NodeTagPrefix = "node-tag-";

export const TagFilterTree: React.FC<TagFilterProps> = ({
  tagTree,
  renderFromLevel,
  mode,
  originalTreeData,
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

  // Helper function to render tree nodes recursively based on original tree structure
  const renderTreeNodeFromOriginal = (node: TreeNodesShape, level: number): React.ReactElement | null => {
    // Skip nodes before renderFromLevel
    if (level < renderFromLevel) {
      // Still need to process children to find nodes at the correct level
      return (
        <React.Fragment key={`${node.page.info.slug}-${level}`}>
          {node.children?.map((childNode: TreeNodesShape) => (
            renderTreeNodeFromOriginal(childNode, level + 1)
          ))}
        </React.Fragment>
      );
    }

    const tags = node.page.info.tags || [];
    
    return (
      <div key={`${node.page.info.slug}-${level}`}>
        {tags.map((tag: string, tagIndex: number) => {
          const isVisible = tagVisibility[tag] !== false;
          
          return (
            <div key={`${tag}-${level}-${tagIndex}`}>
              <div className={styles["tag-item"]}>
                <div className={styles["level-markers"]}>
                  {/* Only render dividers if not the first level */}
                  {level > renderFromLevel &&
                    Array.from({ length: level - renderFromLevel }).map(
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
            </div>
          );
        })}
        {/* Recursively render child nodes */}
        {node.children?.map((childNode: TreeNodesShape) => (
          renderTreeNodeFromOriginal(childNode, level + 1)
        ))}
      </div>
    );
  };

  // Helper function to flatten tree and filter by level (fallback for tree mode without originalTreeData)
  const renderTreeNodeFlat = (tag: string, level: number, childIndex: number = 0): React.ReactElement => {
    const isVisible = tagVisibility[tag] !== false;
    
    return (
      <div key={`${tag}-${level}-${childIndex}`}>
        <div className={styles["tag-item"]}>
          <div className={styles["level-markers"]}>
            {/* Only render dividers if not the first level */}
            {level > renderFromLevel &&
              Array.from({ length: level - renderFromLevel }).map(
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
      </div>
    );
  };

  switch (mode) {
    case "plain":
      return (<div className={styles["tag-filter-tree"]}>
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
      </div>);
    case "tree":
      // Use original tree data if available, otherwise fall back to flat structure
      if (originalTreeData) {
        return (
          <div className={styles["tag-filter-tree"]}>
            <div className={styles["group"]}>
              {originalTreeData.map((node: TreeNodesShape) => (
                renderTreeNodeFromOriginal(node, renderFromLevel)
              ))}
            </div>
          </div>
        );
      } else {
        // Fallback: render as flat structure
        return (
          <div className={styles["tag-filter-tree"]}>
            <div className={styles["group"]}>
              {tagTree.map((group: string[], i: number) => (
                <React.Fragment key={i}>
                  {i >= renderFromLevel && (
                    group.map((tag: string, j: number) => (
                      renderTreeNodeFlat(tag, i, j)
                    ))
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      }
    default:
      return (<></>);
  }
};
