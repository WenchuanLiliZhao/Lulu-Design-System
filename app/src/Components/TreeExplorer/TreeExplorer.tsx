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

### Functional Distinction
- `useAs: "page-tree"`: Similar to VSCode's Explorer, primarily used to display the page structure, supporting node expansion and collapse.
- `useAs: "layer-tree"`: Similar to Figma's Layers, primarily used to display the layer structure, supporting node visibility toggling.

#### Visibility Interaction in Layer Tree

- In the Layer Tree, the visibility of a node is toggled by clicking on the node.
- For example, if `nodeA` is a node, clicking on `nodeA` toggles the visibility of the subtree it belongs to. Any child node `nodeB` within `nodeA` will inherit the visibility state of `nodeA`. However, `nodeB` can still be individually toggled for its own visibility. This way, when `nodeA` is toggled visible again, the visibility state of `nodeB` is preserved. (This is Figma's solution, which I adopted here.)

#### Subtle Differences in Expand/Collapse Interaction Between Page Tree and Layer Tree

- In the Page Tree, nodes are toggled for expansion/collapse by clicking on the node itself, similar to most blog and file manager tree structures.
- In the Layer Tree, since the node itself is not a link, expansion/collapse is toggled by clicking the arrow icon on the left side of the node. Clicking the node itself does not trigger expansion/collapse but is used to toggle the node's visibility.

### Key Implementation Challenges
- Managing the expanded/collapsed state of nodes using React's `useState` hook.
- Synchronizing the global expand/collapse state with individual node states.
- Implementing recursive rendering for nested child nodes while maintaining performance and avoiding excessive re-renders.

## 组件功能概览
- `TreeExplorer` 是一个 React 组件，用于渲染分层的树形结构。它支持节点的展开/折叠功能。
- `TreeNodeComponent` 是一个子组件，负责渲染单个树节点，包括递归渲染其子节点。
- 组件包含“全部展开”和“全部折叠”控件，用于管理全局的展开/折叠状态。

### 功能区分
- `useAs: "page-tree"`：类似于 VSCode 的 Explorer，主要用于展示页面结构，支持节点的展开和折叠。
- `useAs: "layer-tree"`：类似于 Figma 的 Layers，主要用于展示图层结构，支持节点的可见性切换。

#### 关于 Layer Tree 中的可见性交互

- 在 Layer Tree 中，节点的可见性是通过点击节点来切换的。
- 假设 `nodeA` 为一个节点，点击 `nodeA` 时，该节点所在的 subtree 会切换可见性。`nodeA` 中的任何子节点 `nodeB` 也会继承 `nodeA` 的可见性状态，但是，依然可以单独点击 `nodeB` 来切换其自身的可见性；这样，当 `nodeA` 重新被切换为可见时，`nodeB` 的可见性状态会被保留。（这是 Figma 的解决方案，我在这里采用了。）

#### 关于 Page Tree 与 Layer Tree 中的展开/折叠交互的细微不同

- 在 Page Tree 中，节点的展开/折叠是通过点击节点来切换的，这就如同大多数博客和文件管理器的树形结构一样。
- 考虑到，在 Layer Tree 中，节点本身并不是一个链接，因此，节点的展开/折叠是通过点击节点左侧的箭头图标来切换的。点击节点本身不会触发展开/折叠操作，而是用于切换节点的可见性。

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
import { Btn } from "../SmallElements/Btn";

export interface NodeShape {
  id: string; // 对应原先的 slug
  type: PageType; // 对应原先的 type
  name: string; // 对应原先的 title
  children: NodeShape[]; // 子节点数组
}

export interface TreeNodesShape {
  page: PageShape; // The PageType object associated with this node
  children: TreeNodesShape[]; // Array of child nodes
}

// eslint-disable-next-line react-refresh/only-export-components
export function transformTreeNodes(nodes: TreeNodesShape[]): NodeShape[] {
  return nodes.map((node) => ({
    id: node.page.info.slug,
    type: node.page.info.type,
    name: node.page.info.title,
    children: transformTreeNodes(node.children), // 递归转换子节点
  }));
}

// Define the props for the TreeExplorer component
// 定义 TreeExplorer 组件的属性接口
interface TreeExplorerProps {
  data: NodeShape[]; // The hierarchical data structure for the tree
  expand?: boolean; // Whether the tree nodes should be expanded by default
  useAs: "page-tree" | "layer-tree"; // Specify the type of tree being used
  // 指定树的使用类型
}

// Define the TreeNodeComponent for rendering individual nodes
// 定义 TreeNodeComponent 用于渲染单个节点
const TreeNodeComponent: React.FC<{
  node: NodeShape; // The data for the current node
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

  const LayerVisibilityBtn: React.FC<{onClick: () => void;}> = ({onClick}) => {
    return (
      <div onClick={onClick}>
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
      </div>
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
          <div
            className={styles["node-clopener"]}
            onClick={() => {
              if (useAs === "layer-tree") {
                toggleExpand(); // Only toggle if useAs is "page-tree"
                // 仅在 useAs 为 "page-tree" 时切换
              }
            }}
          >
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
              <IconByType icon={node.type} className={styles["page-icon"]} />
            ) : (
              <></>
            )}
            {node.name}
          </div>
          <div className={styles["node-controls"]}>
            {useAs === "layer-tree" && <LayerVisibilityBtn onClick={toggleVisibility} />}
          </div>
        </div>
      </div>
      {/* Recursively render child nodes if the current node has child nodes */}
      {/* 如果当前节点含有子节点，则递归渲染子节点 */}
      {node.children.length > 0 && (
        <div
          className={`${styles["node-children"]} ${
            isInvisible ? styles[LayerVisibility.fatherInvisible] : ""
          }`}
          style={{display: `${isExpanded ? "block" : "none"}`}} // Only show children if the node is expanded
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
