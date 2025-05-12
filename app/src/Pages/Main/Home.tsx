import { TreeExplorer } from "../../Components/TreeExplorer/TreeExplorer";
import { Example_TreeNodeMaps } from "../../ObjectShapes/ExampleData/Example_TreeNodes";
import { PageShape } from "../../ObjectShapes/PageShape";

const Home: PageShape = {
  info: {
    slug: "",
    title: "Home",
    title_display: undefined,
    date: new Date('2025-04-24'),
    type: "page"
  },
  content: (
    <>
      <h1>Hello World</h1>
      <TreeExplorer data={Example_TreeNodeMaps.Math} />
    </>
  ),
};

export default Home;
