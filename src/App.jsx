import "./App.css";
import NavBar from "./components/navbar/Navbar";
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
import LineChart from "./components/charts/LineChart";
import { Bar } from "react-chartjs-2";
import Venue from "./components/venue/Venue";
 


function App() {
  return (
    <DataProvider>
      <Router>
        <NavBar />

        <div className="main bg-light">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barchart" element={<LineChart />} />
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
