import { PageShape } from "../../ObjectShapes/PageShape";

const About: PageShape = {
  info: {
    slug: "about",
    title: "About",
    title_display: undefined,
    date: new Date('2025-04-24'),
    type: "page"
  },
  content: (
    <h1>About</h1>
  )
}

export default About