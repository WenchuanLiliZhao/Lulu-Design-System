import TopologyExample from "../../../Components/NetworkTopology/TopologyExample";
import { PageShape } from "../../../ObjectShapes/PageShape";
import { CDD_TopologyLayout } from "./CDD_SiteConfig";

const CDD_TopologyDemo: PageShape = {
  info: {
    slug: "cdd-topology-demo-with-graph",
    title: "CDD Topology Demo with Graph",
    date: new Date("2025-05-19"),
    type: "page",
  },
  content: (
    <CDD_TopologyLayout>
      <TopologyExample />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
