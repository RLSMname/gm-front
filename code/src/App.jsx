import {BrowserRouter,Routes,Route} from "react-router-dom"
import Layout from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Home from "./pages/Home"
import Info from "./pages/Info"
import Pie from "./pages/Pie"
import { useEffect,useState } from "react"
function App() {
  const [listGames,setGames]=useState([[]]);
   
  
  useEffect(()=>{
    fetch(
      "http://localhost:5000/games"
    ).then((response)=>{
      return response.json()
    }).then((data)=>{
      setGames(data); 
    }
    )
  },[]);

  
  //console.log(listSupplies);
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<Home  itemList={listGames} setList={setGames}></Home>}></Route>
        <Route path="/:id" element={<Info />} />
        <Route path="*" element={<NoPage></NoPage>}></Route>
        <Route path="/games/piechart" element={<Pie itemList={listGames}></Pie>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  
  )
}


export default App
