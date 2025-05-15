import { NodeList } from "../../../Components/Tree/NodeList";
import { mergeTagsOfTreeNodes, transformTreeNodes } from "../../../Components/Tree/TreeExplorer";
import { Example_TreeNodeMaps } from "../../../ObjectShapes/ExampleData/Example_TreeNodes";
import { PageShape } from "../../../ObjectShapes/PageShape";
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
      <NodeList tree={mergeTagsOfTreeNodes(transformTreeNodes(Example_TreeNodeMaps.Math))} />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
