import { ChatBotBtn } from "../../../Components/ChatBotBtn";
import { PageContentPlaceholder } from "../../../Components/Placeholders/PageContentPlacehoder";
import { PageShape } from "../../../ObjectShapes/PageShape";
import { CDD_DataPageLayout } from "./CDD_SiteConfig";

const CDD_DataPageDemo: PageShape = {
  info: {
    slug: "cdd-data-page-demo",
    title: "CDD Data Page Demo",
    date: new Date("2025-5-6 14:16"),
    type: "page",
  },
  content: (
    <CDD_DataPageLayout>
      <PageContentPlaceholder
        image={
          "https://doodleipsum.com/700/flat?i=44d36a6bbb40c8e2a834a10502d46afc"
        }
        title={"A Demo of the Sidebar"}
        description={
          "This file contains a React component designed to render a layout with a resizable sidebar and a main content area."
        }
      />
      <ChatBotBtn />
    </CDD_DataPageLayout>
  ),
};

export default CDD_DataPageDemo;
