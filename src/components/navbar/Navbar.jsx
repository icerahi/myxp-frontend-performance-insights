import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./NavBar.css";
import axios from "axios";
import { all_venues } from "../../urls";
import useStateData from "../../hooks/useStateData";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {

  const {tests,setTests,venues,setVenues} = useStateData()

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(all_venues);
      setTests(res.data);
      
      res.data.map((test) => {
        const allVenues={...test}
       
        delete allVenues.timestamp
   
        setVenues(Object.keys(allVenues))
         
      });
    };
    getData();
  }, []);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <span className="brand-logo fw-bold">XP</span> <span className="fw-bold">Gevme Xchange 2022</span>

    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse " id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto">
        {/* <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li> */}
        
      </ul>
    </div>
  </div>
</nav>
      
    </>
  );
};

export default NavBar;
