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
      <div style={{ padding: "20px" }}>
        <h1>CDD Demo Page</h1>
        <p>This is a demo page to showcase the CheckBoxTree component.</p>
      </div>
    </CDD_TopologyLayout>
  ),
};

export default CDD_TopologyDemo;
