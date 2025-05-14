/* 
## Component Overview
- The `TreeExplorer` component is a React component designed to render a hierarchical tree structure. It displays nodes with expandable/collapsible functionality.
- The `TreeNodeComponent` is a subcomponent responsible for rendering individual tree nodes, including their children recursively.
- The component includes "Expand All" and "Collapse All" controls to manage the global expand/collapse state.

### Functional Distinction
- `useAs: "page-tree"`: Similar to VSCode's Explorer, primarily used to display the page structure, supporting node expansion and collapse.
- `useAs: "layer-tree"`: Similar to Figma's Layers, primarily used to display the layer structure, supporting node visibility toggling.

### Key Implementation Challenges
- Managing the state of expanded/collapsed nodes using React's `useState` hook.
- Synchronizing the global expand/collapse state with individual nodes.
- Implementing recursive rendering for nested child nodes while maintaining performance and avoiding excessive re-renders.

## 组件功能概览
- `TreeExplorer` 是一个 React 组件，用于渲染分层的树形结构。它支持节点的展开/折叠功能。
- `TreeNodeComponent` 是一个子组件，负责渲染单个树节点，包括递归渲染其子节点。
- 组件包含“全部展开”和“全部折叠”控件，用于管理全局的展开/折叠状态。

### 功能区分
- `useAs: "page-tree"`：类似于 VSCode 的 Explorer，主要用于展示页面结构，支持节点的展开和折叠。
- `useAs: "layer-tree"`：类似于 Figma 的 Layers，主要用于展示图层结构，支持节点的可见性切换。

### 主要实现难点
- 使用 React 的 `useState` 钩子管理节点的展开/折叠状态。
- 同步全局展开/折叠状态与各个节点的状态。
- 实现嵌套子节点的递归渲染，同时保持性能并避免过多的重新渲染。
*/

// Import necessary React hooks and components
// 导入必要的 React 钩子和组件
import React, { useState, useEffect } from "react";
import styles from "./TreeExplorer.module.scss";
import { TreeNodesType } from "../../ObjectShapes/TreeNodeShape";
import { Icon } from "../Icon";
import { HoverBox } from "../SmallElements/HoverBox";
import { PageIcon } from "../../ObjectShapes/PageShape";
import { Btn } from "../SmallElements/Btn";

// Define the props for the TreeExplorer component
// 定义 TreeExplorer 组件的属性接口
interface TreeExplorerProps {
  data: TreeNodesType[]; // The hierarchical data structure for the tree
  expand?: boolean; // Whether the tree nodes should be expanded by default
  useAs: "page-tree" | "layer-tree"; // Specify the type of tree being used
  // 指定树的使用类型
}

// Define the TreeNodeComponent for rendering individual nodes
// 定义 TreeNodeComponent 用于渲染单个节点
const TreeNodeComponent: React.FC<{
  node: TreeNodesType; // The data for the current node
  expand: boolean; // Whether the node should be expanded
  level: number; // The depth level of the node in the tree
  useAs: "page-tree" | "layer-tree"; // The type of tree being used
}> = ({ node, expand, level, useAs }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expand); // State for node expansion
  const [isInvisible, setIsInvisible] = useState<boolean>(false); // State for node visibility

  // Toggle the expanded state of the current node
  // 切换当前节点的展开状态
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // Toggle the visibility of the current node and its children
  // 切换当前节点及其子节点的可见性
  const toggleVisibility = () => {
    setIsInvisible((prev) => !prev);
  };

  const LayerVisibility = {
    invisible: "invisible",
    fatherInvisible: "father-invisible",
  };

  const LayerVisibilityBtn: React.FC = () => {
    return (
      <>
        <Btn
          className={styles["visibility-btn"]}
          icon={isInvisible ? "visibility_off" : "visibility"}
          size={"size-tiny"}
          mode={"mode-plain"}
        />
        <Btn
          className={styles["visibility-inherit-btn"]}
          icon={"check_indeterminate_small"}
          size={"size-tiny"}
          mode={"mode-plain"}
        />
      </>
    );
  };

  useEffect(() => {
    // Update the expanded state when the global expand state changes
    // 当全局展开状态发生变化时更新当前节点的展开状态
    setIsExpanded(expand);
  }, [expand]);

  return (
    <div
      className={`${styles["tree-node"]} ${
        isInvisible ? styles[LayerVisibility.invisible] : ""
      }`}
    >
      <div
        className={styles["node"]}
        onClick={() => {
          if (useAs === "page-tree") {
            toggleExpand(); // Only toggle if useAs is "page-tree"
            // 仅在 useAs 为 "page-tree" 时切换
          } else if (useAs === "layer-tree") {
            toggleVisibility(); // Only toggle visibility if useAs is "layer-tree"
            // 仅在 useAs 为 "layer-tree" 时切换可见性
          }
        }}
      >
        {/* Render level markers to visually indicate the depth of the node */}
        {/* 渲染层级标记以直观显示节点的深度 */}
        {Array.from({ length: level }).map((_, index) => (
          <div
            key={index}
            className={`${styles["level-marker"]} ${
              index + 1 == level ? styles["last"] : ""
            }`}
          ></div>
        ))}
        {/* Render a button to toggle the expanded/collapsed state of the node */}
        {/* 渲染一个按钮用于切换节点的展开/折叠状态 */}
        {node.children.length > 0 ? (
          <div className={styles["node-clopener"]} onClick={toggleExpand}>
            <Icon
              className={`${styles["node-clopener-icon"]} ${
                isExpanded ? styles["expanded"] : ""
              }`}
              icon={"arrow_drop_down"} // Display an arrow icon to indicate expand/collapse
              // 显示箭头图标以指示展开/折叠
            />
            <HoverBox />
          </div>
        ) : (
          <div className={styles["node-clopener"]}></div>
        )}
        {/* Render the node content, including the icon and title */}
        {/* 渲染节点内容，包括图标和标题 */}
        <div className={styles["node-content"]}>
          <div className={styles["node-title"]}>
            {useAs === "page-tree" ? (
              <PageIcon
                icon={node.page.info.type}
                className={styles["page-icon"]}
              />
            ) : (
              <></>
            )}
            {node.page.info.title}
          </div>
          <div className={styles["node-controls"]}>
            {useAs === "layer-tree" && <LayerVisibilityBtn />}
          </div>
        </div>
      </div>
      {/* Recursively render child nodes if the current node is expanded */}
      {/* 如果当前节点已展开，则递归渲染子节点 */}
      {isExpanded && node.children.length > 0 && (
        <div
          className={`${styles["node-children"]} ${
            isInvisible ? styles[LayerVisibility.fatherInvisible] : ""
          }`}
        >
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={index}
              node={child}
              expand={expand}
              level={level + 1} // Increment the level for child nodes
              useAs={useAs} // 为子节点增加层级
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Define the main TreeExplorer component
// 定义主 TreeExplorer 组件
export const TreeExplorer: React.FC<TreeExplorerProps> = ({
  data,
  useAs,
  expand = true,
}) => {
  return (
    <>
      <div className={styles["tree-container"]}>
        {/* Render the root nodes of the tree */}
        {/* 渲染树的根节点 */}
        {data.map((node, index) => (
          <TreeNodeComponent
            key={index}
            node={node}
            expand={expand}
            level={0} // Root nodes start at level 0
            useAs={useAs} // 根节点从层级 0 开始
          />
        ))}
      </div>
    </>
  );
};
