import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MovieSearch from "./pages/MovieSearch";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/search" element={<MovieSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
