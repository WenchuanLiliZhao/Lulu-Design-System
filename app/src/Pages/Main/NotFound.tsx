import { PageShape } from "../../ObjectShapes/PageShape";

const NotFound: PageShape = {
  info: {
    slug: "*",
    title: "404 Not Found",
    title_display: undefined,
    date: new Date('2025-04-24'),
    type: "page"
  },
  content: (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

export default NotFound