/* 
## Component Overview
- The `TreeExplorer` component is a React component designed to render a hierarchical tree structure. It displays nodes with expandable/collapsible functionality.
- The `TreeNodeComponent` is a subcomponent responsible for rendering individual tree nodes, including their children recursively.
- The component includes "Expand All" and "Collapse All" controls to manage the global expand/collapse state.

### Key Implementation Challenges
- Managing the state of expanded/collapsed nodes using React's `useState` hook.
- Synchronizing the global expand/collapse state with individual nodes.
- Implementing recursive rendering for nested child nodes while maintaining performance and avoiding excessive re-renders.

## 组件功能概览
- `TreeExplorer` 是一个 React 组件，用于渲染分层的树形结构。它支持节点的展开/折叠功能。
- `TreeNodeComponent` 是一个子组件，负责渲染单个树节点，包括递归渲染其子节点。
- 组件包含“全部展开”和“全部折叠”控件，用于管理全局的展开/折叠状态。

### 主要实现难点
- 使用 React 的 `useState` 钩子管理节点的展开/折叠状态。
- 同步全局展开/折叠状态与各个节点的状态。
- 实现嵌套子节点的递归渲染，同时保持性能并避免过多的重新渲染。
*/

import React, { useState, useEffect } from "react";
import styles from "./TreeExplorer.module.scss";
import { TreeNodesType } from "../../ObjectShapes/TreeNodeShape";
import { Icon } from "../Icon";
import { HoverBox } from "../SmallElements/HoverBox";
import { PageIcon } from "../../ObjectShapes/PageShape";

interface TreeExplorerProps {
  data: TreeNodesType[];
  expand?: boolean;
}

const TreeNodeComponent: React.FC<{
  node: TreeNodesType;
  expand: boolean;
  level: number;
}> = ({ node, expand, level }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expand);

  // Toggle the expanded state of the current node
  // 切换当前节点的展开状态
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    // Update the expanded state when the global expand state changes
    // 当全局展开状态发生变化时更新当前节点的展开状态
    setIsExpanded(expand);
  }, [expand]);

  return (
    <div className={`${styles["tree-node"]}`}>
      <div
        className={styles["node"]}
        onClick={toggleExpand} // Toggle expand state on click
        // 点击时切换展开状态
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
          <div className={styles["node-clopener"]}>
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
        {/* Render the title of the node */}
        {/* 渲染节点的标题 */}
        <div className={styles["node-title"]}>
          <PageIcon
            icon={node.page.info.type}
            className={styles["page-icon"]}
          />
          {node.page.info.title}
        </div>
        <HoverBox />
      </div>
      {/* Recursively render child nodes if the current node is expanded */}
      {/* 如果当前节点已展开，则递归渲染子节点 */}
      {isExpanded && node.children.length > 0 && (
        <div className={styles["node-children"]}>
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={index}
              node={child}
              expand={expand}
              level={level + 1} // Increment the level for child nodes
              // 为子节点增加层级
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeExplorer: React.FC<TreeExplorerProps> = ({
  data,
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
            // 根节点从层级 0 开始
          />
        ))}
      </div>
    </>
  );
};
