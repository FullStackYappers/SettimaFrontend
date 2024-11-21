import "./App.css";
import StickyProvider from "./context/Sticky";
import MoviePage from "./pages/MoviePage";

function App() {
  return <StickyProvider content={<MoviePage />}></StickyProvider>;
}

export default App;
