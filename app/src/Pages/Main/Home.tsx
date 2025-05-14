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
    </>
  ),
};

export default Home;
