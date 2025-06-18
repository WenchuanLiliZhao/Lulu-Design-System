/*
  note 1: This is a component with subtle interaction design, primarily used to display a hierarchical tree structure. Therefore, please carefully read the interaction notes and test it in the demo.

  note 2: In the CDD project, the code for the data explorer on the data dictionary page and the filters on the knowledge graph (topology) page both use this implementation.
  
  note 1: 这是一个在交互设计上较为微妙的组件，主要用于展示分层的树形结构。因此，请格外小心阅读交互注释，并在 demo 中进行测试。
  
  note 2: 在 CDD 项目中，data dictionary 页面中的 data explorer 和 knowledge graph（拓扑图）页面中的筛选器所使用的代码都是这一套。
*/

/* 
## Component Overview
- `TreeExplorer` is a React component used to render a hierarchical tree structure. It supports node expansion and collapse functionality.
- `TreeNodeComponent` is a subcomponent responsible for rendering individual tree nodes, including recursively rendering their child nodes.
- The component includes "Expand All" and "Collapse All" controls to manage the global expand/collapse state.

### Key Implementation Challenges
- Managing the expanded/collapsed state of nodes using React's `useState` hook.
- Synchronizing the global expand/collapse state with individual node states.
- Implementing recursive rendering for nested child nodes while maintaining performance and avoiding excessive re-renders.

## 组件功能概览
- `TreeExplorer` 是一个 React 组件，用于渲染分层的树形结构。它支持节点的展开/折叠功能。
- `TreeNodeComponent` 是一个子组件，负责渲染单个树节点，包括递归渲染其子节点。
- 组件包含"全部展开"和"全部折叠"控件，用于管理全局的展开/折叠状态。

### 主要实现难点
- 使用 React 的 `useState` 钩子管理节点的展开/折叠状态。
- 同步全局展开/折叠状态与各个节点的状态。
- 实现嵌套子节点的递归渲染，同时保持性能并避免过多的重新渲染。
*/

// Import necessary React hooks and components
// 导入必要的 React 钩子和组件
import React, { useState, useEffect } from "react";
import styles from "./TreeExplorer.module.scss";
import { Icon } from "../Icon";
import { HoverBox } from "../SmallElements/HoverBox";
import { IconByType, PageShape, PageType } from "../../ObjectShapes/PageShape";

export interface TreeNodesShape {
  page: PageShape; // The PageType object associated with this node
  children: TreeNodesShape[]; // Array of child nodes
}

// Generic tree node interface for custom rendering
export interface GenericTreeNode {
  id: string;
  name: string;
  children: GenericTreeNode[];
  level?: number;
}

export interface NodeShape extends GenericTreeNode {
  type: PageType; // 对应原先的 type
  children: NodeShape[]; // 子节点数组
  tags?: string[]; // 节点的标签
  fileCount?: number; // 节点的文件数量
}

// eslint-disable-next-line react-refresh/only-export-components
export function transformTreeNodes(
  nodes: TreeNodesShape[],
  level: number = 0
): NodeShape[] {
  return nodes.map((node) => ({
    id: node.page.info.slug,
    type: node.page.info.type,
    name: node.page.info.title,
    level,
    tags: node.page.info.tags,
    fileCount: node.page.info.fileCount,
    children: transformTreeNodes(node.children, level + 1), // 递归并传递层级
  }));
}

// eslint-disable-next-line react-refresh/only-export-components
export function mergeTagsOfTreeNodes(
  nodes: NodeShape[],
  parentTags: string[] = []
): NodeShape[] {
  return nodes.map((node) => {
    // 合并父节点的 tags 和当前节点的 tags
    const mergedTags = [
      ...new Set([...(parentTags || []), ...(node.tags || [])]),
    ];

    // 递归处理子节点
    const transformedChildren = mergeTagsOfTreeNodes(node.children, mergedTags);

    return {
      ...node,
      tags: mergedTags,
      children: transformedChildren,
    };
  });
}

// Define the props for the TreeExplorer component
// 定义 TreeExplorer 组件的属性接口
interface TreeExplorerProps<T extends GenericTreeNode = NodeShape> {
  data: T[]; // The hierarchical data structure for the tree
  expand?: boolean; // Whether the tree nodes should be expanded by default
  defaultExpandLevel?: number; // Default expansion level (nodes at level < defaultExpandLevel will be expanded)
  renderFromLevel?: number; // Start rendering from this level
  // Custom rendering functions
  renderNodeContent?: (node: T, level: number) => React.ReactNode;
  renderNodeActions?: (node: T, level: number) => React.ReactNode;
  // Custom callbacks
  onNodeClick?: (node: T, level: number) => void;
  onNodeExpand?: (node: T, level: number, isExpanded: boolean) => void;
  // Style customization
  className?: string;
}

// Define the TreeNodeComponent for rendering individual nodes
// 定义 TreeNodeComponent 用于渲染单个节点
const TreeNodeComponent = <T extends GenericTreeNode>({
  node,
  expand,
  level,
  defaultExpandLevel = 1,
  renderFromLevel = 0,
  renderNodeContent,
  renderNodeActions,
  onNodeClick,
  onNodeExpand,
}: {
  node: T;
  expand: boolean;
  level: number;
  defaultExpandLevel?: number;
  renderFromLevel?: number;
  renderNodeContent?: (node: T, level: number) => React.ReactNode;
  renderNodeActions?: (node: T, level: number) => React.ReactNode;
  onNodeClick?: (node: T, level: number) => void;
  onNodeExpand?: (node: T, level: number, isExpanded: boolean) => void;
}) => {
  // Use defaultExpandLevel to determine initial expansion state
  const shouldExpandByDefault = level < defaultExpandLevel;
  const [isExpanded, setIsExpanded] = useState<boolean>(
    expand !== undefined ? expand : shouldExpandByDefault
  );

  // Toggle the expanded state of the current node
  // 切换当前节点的展开状态
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onNodeExpand?.(node, level, newExpanded);
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick?.(node, level);
  };

  useEffect(() => {
    // Update the expanded state when the global expand state changes
    // 当全局展开状态发生变化时更新当前节点的展开状态
    if (expand !== undefined) {
      setIsExpanded(expand);
    }
  }, [expand]);

     // Skip rendering if level is below renderFromLevel
   if (level < renderFromLevel) {
     return (
       <React.Fragment>
                    {node.children?.map((child, index) => (
             <TreeNodeComponent
               key={child.id || index}
               node={child as T}
               expand={expand}
               level={level + 1}
               defaultExpandLevel={defaultExpandLevel}
               renderFromLevel={renderFromLevel}
               renderNodeContent={renderNodeContent}
               renderNodeActions={renderNodeActions}
               onNodeClick={onNodeClick}
               onNodeExpand={onNodeExpand}
             />
           ))}
       </React.Fragment>
     );
   }

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={styles["tree-node"]}>
      <div className={styles["node"]} onClick={handleNodeClick}>
        {/* Render level markers to visually indicate the depth of the node */}
        {/* 渲染层级标记以直观显示节点的深度 */}
        {Array.from({ length: level - renderFromLevel }).map((_, index) => (
          <div
            key={index}
            className={`${styles["level-marker"]} ${
              index + 1 == level - renderFromLevel ? styles["last"] : ""
            }`}
          ></div>
        ))}
        
        {/* Render a button to toggle the expanded/collapsed state of the node */}
        {/* 渲染一个按钮用于切换节点的展开/折叠状态 */}
        {hasChildren ? (
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
        
        {/* Render the node content */}
        {/* 渲染节点内容 */}
        <div className={styles["node-content"]}>
          <div className={styles["node-title"]}>
            {renderNodeContent ? (
              renderNodeContent(node, level)
            ) : (
              <>
                {/* Default rendering for NodeShape */}
                {"type" in node && (
                  <IconByType icon={node.type as PageType} className={styles["page-icon"]} />
                )}
                {node.name}
              </>
            )}
          </div>
          <div className={styles["node-controls"]}>
            {renderNodeActions?.(node, level)}
          </div>
        </div>
      </div>
      
      {/* Recursively render child nodes if the current node has child nodes */}
      {/* 如果当前节点含有子节点，则递归渲染子节点 */}
      {hasChildren && (
        <div
          className={styles["node-children"]}
          style={{ display: `${isExpanded ? "block" : "none"}` }} // Only show children if the node is expanded
        >
          {node.children.map((child, index) => (
            <TreeNodeComponent
              key={child.id || index}
              node={child as T}
              expand={expand}
              level={level + 1}
              defaultExpandLevel={defaultExpandLevel}
              renderFromLevel={renderFromLevel}
              renderNodeContent={renderNodeContent}
              renderNodeActions={renderNodeActions}
              onNodeClick={onNodeClick}
              onNodeExpand={onNodeExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Define the main TreeExplorer component
// 定义主 TreeExplorer 组件
export const TreeExplorer = <T extends GenericTreeNode = NodeShape>({
  data,
  expand = true,
  defaultExpandLevel = 1,
  renderFromLevel = 0,
  renderNodeContent,
  renderNodeActions,
  onNodeClick,
  onNodeExpand,
  className,
}: TreeExplorerProps<T>) => {
  return (
    <div className={`${styles["tree-container"]} ${className || ""}`}>
      {/* Render the root nodes of the tree */}
      {/* 渲染树的根节点 */}
      {data.map((node, index) => (
        <TreeNodeComponent
          key={node.id || index}
          node={node}
          expand={expand}
          level={renderFromLevel}
          defaultExpandLevel={defaultExpandLevel}
          renderFromLevel={renderFromLevel}
          renderNodeContent={renderNodeContent}
          renderNodeActions={renderNodeActions}
          onNodeClick={onNodeClick}
          onNodeExpand={onNodeExpand}
        />
      ))}
    </div>
  );
};

