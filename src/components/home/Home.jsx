import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import DataProvider from "../../context/DataProvider";
import useStateData from "../../hooks/useStateData";

const Home = () => {
  const { tests, venues } = useStateData();

  return (
    <div className="container">
      <div className="row">
          <h4>Total Tests : {tests.length}</h4>
            <div className="row">
            {tests.map((result, index) => (
          <div className="col-md-6" key={index}>
            <h5>Tested on : {result.timestamp.toString()}</h5>
            {venues.map((venue) => (
              <p className="d-flex">
                <strong>{venue} - </strong> <br />
                Desktop: {result[venue].desktop} <br />
                mobile: {result[venue].mobile}
            
              </p>
            ))}
          </div>
        ))}
            </div>
      </div>
    </div>
  );
};

export default Home;
