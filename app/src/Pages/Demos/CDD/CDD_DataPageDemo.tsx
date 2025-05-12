import { PageShape } from "../../../ObjectShapes/PageShape";
import { CDD_DataPageLayout } from "./CDD_SiteConfig";

const CDD_DataPageDemo: PageShape = {
  info: {
    slug: "cdd-data-page-demo",
    title: "CDD Data Page Demo",
    date: new Date("2025-5-6 14:16"),
    type: "page"
  },
  content: (
    <CDD_DataPageLayout>
      <div style={{
        height: "80vh",
      }}>

      </div>
    </CDD_DataPageLayout>
  ),
};

export default CDD_DataPageDemo;
