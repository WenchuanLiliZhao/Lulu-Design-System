import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import { TopologyWithParameterControls } from "../../../Components/Tree/NetworkTopology/TopologyWithParameterControls";
import { mergeTagsOfTreeNodes, transformTreeNodes } from "../../../Components/Tree/TreeExplorer";
import { Example_TreeNodeMaps } from "../../../ObjectShapes/ExampleData/Example_TreeNodes";
import { PageShape } from "../../../ObjectShapes/PageShape";
// transformTreeToGraph is no longer needed as TopologyWithParameterControls accepts treeData directly
import { CDD_TopologyLayout } from "./CDD_SiteConfig";

const CDD_TopologyDemo: PageShape = {
  info: {
    slug: "cdd-topology-demo",
    title: "CDD Topology Demo",
    date: new Date("2025-05-13"),
    type: "page",
  },
  content: (
    <CDD_TopologyLayout>
      <TopologyWithParameterControls treeData={mergeTagsOfTreeNodes(transformTreeNodes(Example_TreeNodeMaps.Math))} />
      <ChatBotBtn />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
