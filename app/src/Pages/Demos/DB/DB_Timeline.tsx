import { PageShape } from "../../../ObjectShapes/PageShape";
import { TimelineRuler } from "./TimelineComponents/TimelineRuler";
import { Example_TimelineItems } from "./TimelineComponents/TimelineItemShape";

export const DB_Timeline: PageShape = {
  info: {
    slug: "db-timeline",
    title: "DB Timeline",
    date: new Date("2025-05-21"),
    type: "page",
  },
  content: (
    <>
      <h1>timeline</h1>
      <TimelineRuler inputData={Example_TimelineItems} />
    </>
  ),
}