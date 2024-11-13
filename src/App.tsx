import "./App.css";
import Navbar from "./components/Navbar";
import StickyProvider from "./context/Sticky";

function App() {
  return <StickyProvider content={<Navbar />}></StickyProvider>;
}

export default App;
