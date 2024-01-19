import Navbar from "./Navbar";
import Home from "./Home";
import Player from "./Player";
import Admin from "./Admin";
import Info from "./Info";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route> 
        <Route path="/player" element={<Player />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/info" element={<Info />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
