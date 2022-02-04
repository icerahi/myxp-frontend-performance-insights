import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { getColor } from "../../utils/utils";

const VenuesScore = ({venues,lastTest,selectDevice}) => {
  return (
    <div className="row">
      {venues.map((venue, index) => (
        <div key={index} className="col-md-2 mx-auto">
          <CircularProgressbar
            value={lastTest[venue][selectDevice.value]}
            text={`${lastTest[venue][selectDevice.value]}%`}
            className="text-success"
            background={true}
            styles={buildStyles({
              ...getColor(lastTest[venue][selectDevice.value]),
            })}
          />
          <p className="text-capitalize lead text-center">{venue}</p>
        </div>
      ))}
    </div>
  );
};

export default VenuesScore;
