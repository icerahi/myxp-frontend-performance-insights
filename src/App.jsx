import "./App.css";
import SideNav from "./components/sideNav/SideNav";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <DataProvider>
      <Router>
        <SideNav />

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
