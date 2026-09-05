import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moviedetails" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
