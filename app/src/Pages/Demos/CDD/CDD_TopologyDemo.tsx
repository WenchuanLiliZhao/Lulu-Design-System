import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import { PageContentPlaceholder } from "../../../Components/Placeholders/PageContentPlacehoder";
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
      <PageContentPlaceholder
        image={
          "https://doodleipsum.com/700/flat?i=44d36a6bbb40c8e2a834a10502d46afc"
        }
        title={"A Demo for the Sidebar of Knowledge Topology"}
        description={
          "This is a component with subtle interaction design, primarily used to display a hierarchical tree structure. Therefore, please carefully read the interaction notes and test it in the demo."
        }
      />
      <ChatBotBtn />
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
