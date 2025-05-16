import { PageShape } from "../../ObjectShapes/PageShape";
import DemoPages from "../Demos/_DemoPages";
import styles from "./Home.module.scss";

const Home: PageShape = {
  info: {
    slug: "",
    title: "Home",
    title_display: undefined,
    date: new Date("2025-04-24"),
    type: "page",
  },
  content: (
    <div className={styles["home-list-container"]}>
      <div className={styles["home-list"]}>
        <div className={styles["title"]}>
          <h1>Demo List</h1>
        </div>
        <a className={styles["item"]} href={`/${DemoPages.CDD_Home.info.slug}`}>
          🏠 A Demo for CDD Home
        </a>
        <a
          className={styles["item"]}
          href={`/${DemoPages.CDD_DataPageDemo.info.slug}`}
        >
          📊 A Demo for the Sidebar for Data Dictionary
        </a>
        <a
          className={styles["item"]}
          href={`/${DemoPages.CDD_TopologyDemo.info.slug}`}
        >
          🐢 A Demo for the Sidebar for Topology Graph
        </a>
      </div>
      <div className={styles["links"]}>
        <a href="https://github.com/WenchuanLiliZhao/Lulu-Design-System/tree/main/app">View GitHub repository</a>
        <a href="https://lulu-design-system.netlify.app/">View online demo</a>
        <a href="https://github.com/WenchuanLiliZhao/Lulu-Design-System/tree/main/app/_lulu-design-system-notes/Jira%20Notes">Jira notes</a>
      </div>
    </div>
  ),
};

export default Home;
