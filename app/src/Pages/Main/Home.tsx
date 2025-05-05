import { TreeExplorer } from "../../Components/TreeExplorer";
import { Example_TreeNodeMaps } from "../../Types/ExampleData/Example_TreeNodes";
import { PageType } from "../../Types/PageType";

const Home: PageType = {
  info: {
    slug: "",
    title: "Home",
    title_display: undefined,
    date: new Date('2025-04-24'),
  },
  content: (
    <>
      <h1>Hello World</h1>
      <TreeExplorer data={Example_TreeNodeMaps.Math} />
    </>
  ),
};

export default Home;
