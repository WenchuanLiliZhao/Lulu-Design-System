import { PageShape } from "../../../ObjectShapes/PageShape";
import { Timeline } from "./TimelineComponents/Timeline";
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
      <Timeline inputData={Example_TimelineItems} />
    </>
  ),
}