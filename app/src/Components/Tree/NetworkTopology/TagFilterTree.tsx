import { Btn } from "../../SmallElements/Btn";
import React, { useState } from "react";
import styles from "./TagFilterTree.module.scss";
import { Icon } from "../../Icon";
import { TreeNodesShape } from "../TreeExplorer";
import { Dropdown, ClickToClose } from "../../Dropdown/Dropdown";
import { Menu } from "../../Dropdown/Menu";
import { MenuItem } from "../../Dropdown/MenuItem";

interface TagFilterProps {
  tagTree: string[][];
  renderFromLevel: number;
  mode?: "plain" | "tree"; // Make mode optional with internal state management
  // Add optional original tree data for tree mode
  originalTreeData?: TreeNodesShape[];
  // Add optional callback when mode changes
  onModeChange?: (mode: "plain" | "tree") => void;
}

export const NodeTagPrefix = "node-tag-";

export const TagFilterTree: React.FC<TagFilterProps> = ({
  tagTree,
  renderFromLevel,
  mode: initialMode = "plain", // Default to plain mode
  originalTreeData,
  onModeChange,
}) => {
  // Track visibility state for each tag (true means visible, false means hidden)
  const [tagVisibility, setTagVisibility] = useState<Record<string, boolean>>(
    {}
  );

  // Add internal mode state management
  const [currentMode, setCurrentMode] = useState<"plain" | "tree">(initialMode);

  // Function to handle mode change
  const handleModeChange = (newMode: "plain" | "tree") => {
    setCurrentMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  // Mode options for dropdown
  const modeOptions = [
    { value: "plain", label: "Plain Mode", icon: "list" },
    { value: "tree", label: "Tree Mode", icon: "account_tree" },
  ];

  // Create dropdown content for mode selection using Menu component
  const modeDropdownContent = (
    <Menu
      group={[
        {
          groupItems: modeOptions.map((option) => (
            <MenuItem
              key={option.value}
              item={{
                icon: option.icon,
                text: option.label,
                onClick: () =>
                  handleModeChange(option.value as "plain" | "tree"),
              }}
              className={`${ClickToClose} ${
                currentMode === option.value ? styles["active"] : ""
              }`}
            />
          )),
        },
      ]}
    />
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
  const renderTreeNodeFromOriginal = (
    node: TreeNodesShape,
    level: number
  ): React.ReactElement | null => {
    // Skip nodes before renderFromLevel
    if (level < renderFromLevel) {
      // Still need to process children to find nodes at the correct level
      return (
        <React.Fragment key={`${node.page.info.slug}-${level}`}>
          {node.children?.map((childNode: TreeNodesShape) =>
            renderTreeNodeFromOriginal(childNode, level + 1)
          )}
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
        {node.children?.map((childNode: TreeNodesShape) =>
          renderTreeNodeFromOriginal(childNode, level + 1)
        )}
      </div>
    );
  };

  // Helper function to flatten tree and filter by level (fallback for tree mode without originalTreeData)
  const renderTreeNodeFlat = (
    tag: string,
    level: number,
    childIndex: number = 0
  ): React.ReactElement => {
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

  // Render the main component with mode switcher
  return (
    <div className={styles["tag-filter-container"]}>
      {/* Mode Switcher */}
      <div className={styles["mode-switcher-container"]}>
        <Dropdown
          trigger={
            <Btn
              icon={currentMode === "plain" ? "list" : "account_tree"}
              text={currentMode === "plain" ? "Plain Mode" : "Tree Mode"}
              size="size-medium"
              mode="mode-possitive-filled"
              deco="arrow_drop_down"
            />
          }
          dropdownContent={modeDropdownContent}
          dropdownSize="medium"
          position="left"
          className={styles["mode-dropdown"]}
        />
      </div>

      {/* Tag Filter Tree Content */}
      <div className={styles["tag-filter-tree"]}>
        {renderTagFilterContent()}
      </div>
    </div>
  );

  // Helper function to render content based on current mode
  function renderTagFilterContent() {
    switch (currentMode) {
      case "plain":
        return tagTree.map((group: string[], i: number) => {
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
        });
      case "tree":
        // Use original tree data if available, otherwise fall back to flat structure
        if (originalTreeData) {
          return (
            <div className={styles["group"]}>
              {originalTreeData.map((node: TreeNodesShape) =>
                renderTreeNodeFromOriginal(node, 0)
              )}
            </div>
          );
        } else {
          // Fallback: render as flat structure
          return (
            <div className={styles["group"]}>
              {tagTree.map((group: string[], i: number) => (
                <React.Fragment key={i}>
                  {i >= renderFromLevel &&
                    group.map((tag: string, j: number) =>
                      renderTreeNodeFlat(tag, i, j)
                    )}
                </React.Fragment>
              ))}
            </div>
          );
        }
      default:
        return <></>;
    }
  }
};
