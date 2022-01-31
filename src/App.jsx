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
import BarChart from "./components/charts/BarChart";
import { Bar } from "react-chartjs-2";
import Venue from "./components/venue/Venue";

function App() {
  return (
    <DataProvider>
      <Router>
        <SideNav />

        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/venue/:venue">
              <Route path=":timestamp" element={<VenueByNameTimeStamp/>}/>
              <Route path="" element={<Venue/>}/>
            </Route>
          </Routes>

    
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
