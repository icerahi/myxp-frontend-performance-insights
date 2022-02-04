import NavBar from "./components/navbar/Navbar";
import DataProvider from "./context/DataProvider";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />
        <div className="main bg-light">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
