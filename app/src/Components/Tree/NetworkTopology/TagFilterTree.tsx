import { Btn } from "../../SmallElements/Btn";
import React, { useState } from "react";
import styles from "./TagFilterTree.module.scss";
import treeStyles from "../TreeExplorer.module.scss";
import { Icon } from "../../Icon";
import { TreeNodesShape } from "../TreeExplorer";
import { Dropdown, ClickToClose } from "../../Dropdown/Dropdown";
import { Menu } from "../../Dropdown/Menu";
import { MenuItem } from "../../Dropdown/MenuItem";
import { HoverBox } from "../../SmallElements/HoverBox";

const DefaultShowLevel = 1;

interface TagFilterProps {
  tagTree: string[][];
  renderFromLevel: number;
  mode?: "plain" | "tree"; 
  originalTreeData?: TreeNodesShape[];
  onModeChange?: (mode: "plain" | "tree") => void;
}

export const NodeTagPrefix = "node-tag-";

// Tag tree node interface for tree mode
interface TagTreeNode {
  id: string;
  tag: string;
  level: number;
  children: TagTreeNode[];
  originalNode?: TreeNodesShape;
}

export const TagFilterTree: React.FC<TagFilterProps> = ({
  tagTree,
  renderFromLevel,
  mode: initialMode = "plain",
  originalTreeData,
  onModeChange,
}) => {
  // Track visibility state for each tag
  const [tagVisibility, setTagVisibility] = useState<Record<string, boolean>>({});
  
  // Track expansion state for tree mode
  const [nodeExpanded, setNodeExpanded] = useState<Record<string, boolean>>({});

  // Internal mode state management
  const [currentMode, setCurrentMode] = useState<"plain" | "tree">(initialMode);

  // Function to handle mode change
  const handleModeChange = (newMode: "plain" | "tree") => {
    setCurrentMode(newMode);
    if (onModeChange) {
      onModeChange(newMode);
    }
  };

  // Function to check if a node should be expanded by default
  const shouldExpandByDefault = (level: number): boolean => {
    return level < DefaultShowLevel;
  };

  // Function to get node expansion state
  const getNodeExpansionState = (nodeId: string, level: number): boolean => {
    if (nodeExpanded[nodeId] === undefined) {
      return shouldExpandByDefault(level);
    }
    return nodeExpanded[nodeId];
  };

  // Function to toggle node expansion
  const toggleNodeExpansion = (nodeId: string) => {
    setNodeExpanded(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  // Function to toggle visibility of elements with tag
  const toggleTagVisibility = (tag: string) => {
    const elements = document.getElementsByClassName(`${NodeTagPrefix}-${tag}`);
    const currentVisibility = tagVisibility[tag] !== false;
    const newVisibility = !currentVisibility;
    setTagVisibility({ ...tagVisibility, [tag]: newVisibility });

    Array.from(elements).forEach((element) => {
      if (newVisibility) {
        element.classList.remove(`${tag}-target-hidden`);
      } else {
        element.classList.add(`${tag}-target-hidden`);
      }
    });
  };

  const toggleIsTarget = (tag: string, isTarget: boolean) => {
    const elements = document.getElementsByClassName(`${NodeTagPrefix}-${tag}`);
    Array.from(elements).forEach((element) => {
      if (isTarget) {
        element.classList.add(styles["is-target"]);
      } else {
        element.classList.remove(styles["is-target"]);
      }
    });
  };

  // Helper function to check if a tag is inherited hidden
  const isTagInheritedHidden = (tag: string): boolean => {
    if (!originalTreeData) return false;
    const parentTags = getParentTags(tag, originalTreeData);
    return parentTags.some(parentTag => tagVisibility[parentTag] === false);
  };

  // Helper function to get all parent tags of a given tag
  const getParentTags = (targetTag: string, nodes: TreeNodesShape[], parentTags: string[] = []): string[] => {
    for (const node of nodes) {
      const nodeTags = node.page.info.tags || [];
      if (nodeTags.includes(targetTag)) {
        return parentTags;
      }
      if (hasTagInSubtree(targetTag, node.children)) {
        const childParentTags = getParentTags(targetTag, node.children, [...parentTags, ...nodeTags]);
        if (childParentTags.length >= 0) {
          return childParentTags;
        }
      }
    }
    return [];
  };

  // Helper function to check if a tag exists in a subtree
  const hasTagInSubtree = (targetTag: string, nodes: TreeNodesShape[]): boolean => {
    for (const node of nodes) {
      const nodeTags = node.page.info.tags || [];
      if (nodeTags.includes(targetTag)) {
        return true;
      }
      if (hasTagInSubtree(targetTag, node.children)) {
        return true;
      }
    }
    return false;
  };

  // Convert TreeNodesShape to TagTreeNode for tree mode
  const convertToTagTreeNodes = (nodes: TreeNodesShape[], level: number = 0): TagTreeNode[] => {
    const tagNodes: TagTreeNode[] = [];
    
    nodes.forEach(node => {
      const tags = node.page.info.tags || [];
      tags.forEach(tag => {
        tagNodes.push({
          id: `${node.page.info.slug}-${tag}-${level}`,
          tag,
          level,
          children: convertToTagTreeNodes(node.children, level + 1),
          originalNode: node
        });
      });
    });
    
    return tagNodes;
  };

  // TreeNode component with TreeExplorer styling
  const TagTreeNodeComponent: React.FC<{
    node: TagTreeNode;
    level: number;
  }> = ({ node, level }) => {
    const nodeId = node.id;
    const isExpanded = getNodeExpansionState(nodeId, level);
    const hasChildren = node.children && node.children.length > 0;
    const isVisible = tagVisibility[node.tag] !== false;
    const isInheritedHidden = isTagInheritedHidden(node.tag);

    // Skip rendering if level is below renderFromLevel
    if (level < renderFromLevel) {
      return (
        <React.Fragment>
          {node.children?.map((child) => (
            <TagTreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
        </React.Fragment>
      );
    }

    return (
      <div className={`${treeStyles["tree-node"]} ${
        !isVisible ? treeStyles["node-hidden"] : 
        isInheritedHidden ? treeStyles["node-inherited-hidden"] : ""
      }`}>
        <div className={treeStyles["node"]}>
          {/* Level markers using TreeExplorer styles */}
          {Array.from({ length: level - renderFromLevel }).map((_, index) => (
            <div
              key={index}
              className={`${treeStyles["level-marker"]} ${
                index + 1 === level - renderFromLevel ? treeStyles["last"] : ""
              }`}
            ></div>
          ))}
          
          {/* Expand/collapse button using TreeExplorer styles */}
          {hasChildren ? (
            <div
              className={treeStyles["node-clopener"]}
              onClick={() => toggleNodeExpansion(nodeId)}
            >
              <Icon
                className={`${treeStyles["node-clopener-icon"]} ${
                  isExpanded ? treeStyles["expanded"] : ""
                }`}
                icon={"arrow_drop_down"}
              />
              <HoverBox />
            </div>
          ) : (
            <div className={treeStyles["node-clopener"]}></div>
          )}
          
          {/* Tag content using TreeExplorer structure */}
          <div className={treeStyles["node-content"]}>
            <div
              className={`${treeStyles["node-title"]} ${styles["tag-info"]}`}
              onClick={() => toggleTagVisibility(node.tag)}
              onMouseEnter={() => toggleIsTarget(node.tag, true)}
              onMouseLeave={() => toggleIsTarget(node.tag, false)}
            >
              <Icon className={treeStyles["page-icon"]} icon="tag" />
              {node.tag}
            </div>
            <div className={treeStyles["node-controls"]}>
              <Btn
                className={styles["tag-btn"]}
                icon={isVisible ? "visibility" : "visibility_off"}
                size={"size-tiny"}
                mode={"mode-plain"}
                onClick={() => toggleTagVisibility(node.tag)}
                onMouseEnter={() => toggleIsTarget(node.tag, true)}
                onMouseLeave={() => toggleIsTarget(node.tag, false)}
              />
            </div>
          </div>
        </div>
        
        {/* Conditionally render child nodes using TreeExplorer structure */}
        {hasChildren && isExpanded && (
          <div className={treeStyles["node-children"]}>
            {node.children.map((child) => (
              <TagTreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Mode options for dropdown
  const modeOptions = [
    { value: "plain", label: "Plain Mode", icon: "list" },
    { value: "tree", label: "Tree Mode", icon: "account_tree" },
  ];

  // Create dropdown content for mode selection
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

  // Helper function to render content based on current mode
  function renderTagFilterContent() {
    switch (currentMode) {
      case "plain": {
        // For plain mode, check expansion state for each level
        const renderableLevels: number[] = [];
        
        for (let i = renderFromLevel; i < tagTree.length; i++) {
          if (i === renderFromLevel) {
            renderableLevels.push(i);
          } else {
            const parentLevelId = `level-${i - 1}`;
            const isParentExpanded = getNodeExpansionState(parentLevelId, i - 1);
            if (isParentExpanded) {
              renderableLevels.push(i);
            } else {
              break;
            }
          }
        }
        
        return renderableLevels.map((i: number) => {
          const levelNodeId = `level-${i}`;
          const isLevelExpanded = getNodeExpansionState(levelNodeId, i);
          const hasNextLevel = i < tagTree.length - 1 && tagTree[i + 1] && tagTree[i + 1].length > 0;
          
          return (
            <React.Fragment key={i}>
              {tagTree[i].map((tag: string, j: number) => {
                const isVisible = tagVisibility[tag] !== false;
                const isInheritedHidden = isTagInheritedHidden(tag);
                return (
                  <div key={j} className={`${treeStyles["tree-node"]} ${
                    !isVisible ? treeStyles["node-hidden"] : 
                    isInheritedHidden ? treeStyles["node-inherited-hidden"] : ""
                  }`}>
                    <div className={treeStyles["node"]}>
                      {/* Level markers using TreeExplorer styles */}
                      {Array.from({ length: i - renderFromLevel }).map((_, index) => (
                        <div
                          key={index}
                          className={`${treeStyles["level-marker"]} ${
                            index + 1 === i - renderFromLevel ? treeStyles["last"] : ""
                          }`}
                        ></div>
                      ))}
                      
                      {/* Expand/collapse button for levels using TreeExplorer styles */}
                      {hasNextLevel && j === 0 ? (
                        <div
                          className={treeStyles["node-clopener"]}
                          onClick={() => toggleNodeExpansion(levelNodeId)}
                        >
                          <Icon
                            className={`${treeStyles["node-clopener-icon"]} ${
                              isLevelExpanded ? treeStyles["expanded"] : ""
                            }`}
                            icon={"arrow_drop_down"}
                          />
                          <HoverBox />
                        </div>
                      ) : (
                        <div className={treeStyles["node-clopener"]}></div>
                      )}
                      
                      {/* Tag content using TreeExplorer structure */}
                      <div className={treeStyles["node-content"]}>
                        <div
                          className={`${treeStyles["node-title"]} ${styles["tag-info"]}`}
                          onClick={() => toggleTagVisibility(tag)}
                          onMouseEnter={() => toggleIsTarget(tag, true)}
                          onMouseLeave={() => toggleIsTarget(tag, false)}
                        >
                          <Icon className={treeStyles["page-icon"]} icon="tag" />
                          {tag}
                        </div>
                        <div className={treeStyles["node-controls"]}>
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
                  </div>
                );
              })}
            </React.Fragment>
          );
        });
      }
      case "tree": {
        if (originalTreeData) {
          const tagTreeNodes = convertToTagTreeNodes(originalTreeData);
          return (
            <React.Fragment>
              {tagTreeNodes.map((node) => (
                <TagTreeNodeComponent
                  key={node.id}
                  node={node}
                  level={0}
                />
              ))}
            </React.Fragment>
          );
        } else {
          // Fallback: render as flat structure with TreeExplorer styling
          return (
            <React.Fragment>
              {tagTree.map((group: string[], i: number) => (
                <React.Fragment key={i}>
                  {i >= renderFromLevel &&
                    group.map((tag: string, j: number) => {
                      const isVisible = tagVisibility[tag] !== false;
                      const isInheritedHidden = isTagInheritedHidden(tag);
                                            return (
                        <div key={j} className={`${treeStyles["tree-node"]} ${
                          !isVisible ? treeStyles["node-hidden"] : 
                          isInheritedHidden ? treeStyles["node-inherited-hidden"] : ""
                        }`}>
                          <div className={treeStyles["node"]}>
                            {/* Level markers */}
                            {Array.from({ length: i - renderFromLevel }).map((_, index) => (
                              <div
                                key={index}
                                className={`${treeStyles["level-marker"]} ${
                                  index + 1 === i - renderFromLevel ? treeStyles["last"] : ""
                                }`}
                              ></div>
                            ))}
                            <div className={treeStyles["node-clopener"]}></div>
                            {/* Tag content */}
                            <div className={treeStyles["node-content"]}>
                              <div
                                className={`${treeStyles["node-title"]} ${styles["tag-info"]}`}
                                onClick={() => toggleTagVisibility(tag)}
                                onMouseEnter={() => toggleIsTarget(tag, true)}
                                onMouseLeave={() => toggleIsTarget(tag, false)}
                              >
                                <Icon className={treeStyles["page-icon"]} icon="tag" />
                                {tag}
                              </div>
                              <div className={treeStyles["node-controls"]}>
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
                        </div>
                      );
                    })}
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        }
      }
      default:
        return <></>;
    }
  }

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

      {/* Tag Filter Tree Content using TreeExplorer container */}
      <div className={treeStyles["tree-container"]}>
        {renderTagFilterContent()}
      </div>
    </div>
  );
};
