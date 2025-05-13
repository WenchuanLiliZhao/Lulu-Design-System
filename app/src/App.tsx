import { BrowserRouter, Route, Routes } from "react-router"
import MainPages from "./Pages/Main/_MainPages"
import "./assets/GlobalStyles/_app.scss"
import DemoPages from "./Pages/Demos/_DemoPages"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<>{MainPages.Home.content}</>} />

        {Object.values(MainPages).map((item, i: number) => (
          <Route
            key={i}
            path={`/${item.info.slug}`}
            element={<>{item.content}</>}
          />
        ))}

        {Object.values(DemoPages).map((item, i: number) => (
          <Route
            key={i}
            path={`/${item.info.slug}`}
            element={<>{item.content}</>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
