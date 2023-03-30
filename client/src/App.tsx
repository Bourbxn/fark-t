import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import EachOrder from "./pages/EachOrder";
import Home from "./pages/Home";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<MyOrder />} />
        <Route path="/order/:id" element={<EachOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
