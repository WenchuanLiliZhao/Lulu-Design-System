import { BrowserRouter, Route, Routes } from "react-router"
import MainPages from "./Pages/Main/_MainPages"
import { BasicLayout } from "./Components/Layouts"
import "./assets/GlobalStyles/_app.scss"
import DemoPages from "./Pages/Demos/_DemoPages"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<BasicLayout>{MainPages.Home.content}</BasicLayout>} />

        {Object.values(MainPages).map((item, i: number) => (
          <Route
            key={i}
            path={`/${item.info.slug}`}
            element={<BasicLayout>{item.content}</BasicLayout>}
          />
        ))}

        {Object.values(DemoPages).map((item, i: number) => (
          <Route
            key={i}
            path={`/${item.info.slug}`}
            element={<BasicLayout>{item.content}</BasicLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
