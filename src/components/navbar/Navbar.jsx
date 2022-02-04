import React from "react";
import { useEffect } from "react";
import "./NavBar.css";
import axios from "axios";
import { domain } from "../../.env.js";
import useStateData from "../../hooks/useStateData";

const NavBar = () => {
  const { setTests, setVenues } = useStateData();

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${domain}/performance.json`);
      setTests(res.data);

      res.data.map((test) => {
        const allVenues = { ...test };

        delete allVenues.timestamp;

        setVenues(Object.keys(allVenues));
      });
    };
    getData();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            <span className="brand-logo fw-bold">XP</span>{" "}
            <span className="fw-bold">Gevme Xchange 2022</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              {/* <li className="nav-item">
                 
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
