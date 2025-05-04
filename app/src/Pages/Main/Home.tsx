import { Page } from "../../Types/PageType";

const Home: Page = {
  info: {
    slug: "",
    title: "Home",
    title_display: undefined,
    date: new Date('2025-04-24'),
  },
  content: (
    <>
      <h1>Hello World</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eum
        reiciendis quas eius temporibus iste culpa cupiditate dolorem corporis
        aperiam quae quisquam quia adipisci totam enim, incidunt magni quaerat
        nihil.
      </p>
      <section>
        <h2>Section 1</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </p>
      </section>
      <section>
        <h2>Section 2</h2>
        <p>
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
          Praesent mauris. Fusce nec tellus sed augue semper porta.
        </p>
      </section>
      <section>
        <h2>Section 3</h2>
        <p>
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>
      </section>
      <footer>
        <p>
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam.
        </p>
      </footer>
    </>
  ),
};

export default Home;
