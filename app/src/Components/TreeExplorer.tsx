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
import { TreeNodesType } from "../Types/TreeNodeType";
import { Icon } from "./Icon";

interface TreeExplorerProps {
  data: TreeNodesType[];
  expand?: boolean;
}

const TreeNodeComponent: React.FC<{ node: TreeNodesType; expand: boolean }> = ({ node, expand }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(expand);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    setIsExpanded(expand); // Update state when the global expand state changes
  }, [expand]);

  return (
    <div className={styles["tree-node"]}>
      <div className={styles["node-header"]} onClick={toggleExpand}>
        {node.children.length > 0 && (
          <Icon icon={isExpanded ? "add_box" : "chips"} />
        )}
        {node.page.info.title}
      </div>
      {isExpanded && node.children.length > 0 && (
        <div className={styles["node-children"]}>
          {node.children.map((child, index) => (
            <TreeNodeComponent key={index} node={child} expand={expand} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TreeExplorer: React.FC<TreeExplorerProps> = ({ data, expand = true }) => {
  const [globalExpand, setGlobalExpand] = useState<boolean>(expand);

  const handleExpandAll = () => {
    setGlobalExpand(true);
  };

  const handleCollapseAll = () => {
    setGlobalExpand(false);
  };

  return (
    <div className={styles["tree-explorer"]}>
      <div className={styles["controls"]}>
        <button onClick={handleExpandAll}>
          <Icon icon={"shadow_add"} />
          Expand All
          </button>
        <button onClick={handleCollapseAll}><Icon icon={"shadow_minus"} />Collapse All</button>
      </div>
      {data.map((node, index) => (
        <TreeNodeComponent key={index} node={node} expand={globalExpand} />
      ))}
    </div>
  );
};