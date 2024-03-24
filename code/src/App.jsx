import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Home from "./pages/Home"
import Info from "./pages/Info"
function App() {
  const listGames=[
    {id:1,name:"game1",developer:"developer1",price:10,description:"Once upon a time"},
    {id:2,name:"game2",developer:"developer2",price:11,description:"Always"},
    {id:3,name:"game3",developer:"developer3",price:12,description:"Hello"},
    {id:4,name:"game4",developer:"developer4",price:13,description:"Nevermind"},
  ]
  
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Home  itemList={listGames}></Home>}></Route>
        <Route path="/:id" element={<Info />} />
        <Route path="*" element={<NoPage></NoPage>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
