
import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import TopologyExample from "../../../Components/Tree/NetworkTopology/TopologyExample";
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
      <TopologyExample />
      <ChatBotBtn />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
