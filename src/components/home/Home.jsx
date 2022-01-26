import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import DataProvider from "../../context/DataProvider";
import useStateData from "../../hooks/useStateData";

const Home = () => {
  const { tests, venues } = useStateData();
  
  console.log(tests)
  tests.map(result=> console.log(result['timestamp']))
  

  return (
    <div className="container">
      <div className="row">
        {tests.map((result, index) => (
          <>
            <h5>{Object.keys(result).toString()}1</h5>
            {venues.map((venue) => (
              <p>
                {" "}
                <strong>{venue}</strong>
                Desktop:{result[venue].desktop}
                mobile:{result[venue].mobile}
                 
              </p>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
