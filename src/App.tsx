import "./App.css";
import StickyProvider from "./context/Sticky";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <StickyProvider
        content={
          <Routes>
            <Route path="/" element={<MoviePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        }
      />
    </Router>
  );
}

export default App;
