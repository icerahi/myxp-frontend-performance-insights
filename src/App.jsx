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
import VenueByName from "./components/venue/VenueByName";
import VenueByNameTimeStamp from "./components/venue/VenueByNameTimeStamp";

function App() {
  return (
    <DataProvider>
      <Router>
        <SideNav />

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venue/:venue">
              <Route path=":timestamp" element={<VenueByNameTimeStamp/>}/>
              <Route path="" element={<VenueByName/>}/>
            </Route>
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
