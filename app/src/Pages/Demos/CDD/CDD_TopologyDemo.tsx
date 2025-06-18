import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import { TopologyWithParameterControls } from "../../../Components/Tree/NetworkTopology/TopologyWithParameterControls";
import { mergeTagsOfTreeNodes, NodeShape, TreeNodesShape } from "../../../Components/Tree/TreeExplorer";
import { Example_TreeNodeMaps } from "../../../ObjectShapes/ExampleData/Example_TreeNodes";
import { PageShape } from "../../../ObjectShapes/PageShape";
// transformTreeToGraph is no longer needed as TopologyWithParameterControls accepts treeData directly
import { CDD_TopologyLayout } from "./CDD_SiteConfig";

// Custom transform function that adds fileCount to node names
function transformTreeNodesWithFileCount(
  nodes: TreeNodesShape[],
  level: number = 0
): NodeShape[] {
  return nodes.map((node) => {
    const baseTitle = node.page.info.title;
    const fileCount = node.page.info.fileCount;
    const displayName = fileCount && fileCount > 0 
      ? `${baseTitle} <span style="color: var(--color-sec)">(${fileCount})</span>` 
      : baseTitle;
    
    return {
      id: node.page.info.slug,
      type: node.page.info.type,
      name: displayName,
      level,
      tags: node.page.info.tags,
      fileCount: node.page.info.fileCount,
      children: transformTreeNodesWithFileCount(node.children, level + 1), // 递归并传递层级
    };
  });
}

const CDD_TopologyDemo: PageShape = {
  info: {
    slug: "cdd-topology-demo",
    title: "CDD Topology Demo",
    date: new Date("2025-05-13"),
    type: "page",
  },
  content: (
    <CDD_TopologyLayout>
      <TopologyWithParameterControls treeData={mergeTagsOfTreeNodes(transformTreeNodesWithFileCount(Example_TreeNodeMaps.Math))} />
      <ChatBotBtn />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
