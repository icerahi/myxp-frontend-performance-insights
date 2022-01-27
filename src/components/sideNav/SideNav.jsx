import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./SideNav.css";
import axios from "axios";
import { all_venues } from "../../urls";
import useStateData from "../../hooks/useStateData";
import { Link, NavLink } from "react-router-dom";

const SideNav = () => {

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
      <nav className="navbar navbar-light">
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          href="#offcanvasExample"
          role="button"
          aria-controls="offcanvasExample"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-start sidebar-nav"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title  text-muted"
              id="offcanvasExampleLabel"
            >
              <Link to="/">Home</Link>
            </h5>
            {/* <button
            type="button"
            className="btn-close text-reset "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button> */}
          </div>
          <div className="offcanvas-body">
            <nav className="navbar-light m-0">
              <ul className="navbar-nav m-0 p-0">
                {venues.map((venue,index) => (
                  <li key={index} className="my-2">
                    <NavLink className={ (navData)=> navData.isActive?"nav-link text-capitalize btn btn-success fw-bolder px-3 active":"nav-link text-capitalize btn btn-default fw-bolder px-3"}
                      to={`/venue/${venue}`}
   
                    >
                     {venue}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNav;
