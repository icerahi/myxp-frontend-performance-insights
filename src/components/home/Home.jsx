import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import DataProvider from "../../context/DataProvider";
import useStateData from "../../hooks/useStateData";
import Select from "react-select";
import { useState } from "react";
import dayjs from "dayjs";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import LineChart from "../charts/LineChart";

const deviceOptions = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];
const venueOptions = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];

const Home = () => {
  const { tests, venues } = useStateData();

  const deviceOptions = [
    { value: "desktop", label: "Desktop" },
    { value: "mobile", label: "Mobile" },
  ];

  const venueOptions = venues?.map((venue) => ({ value: venue, label: venue }));

  const [selectDevice, setSelectDevice] = useState(deviceOptions[0]);
  const [selectVenue, setSelectVenue] = useState(venueOptions[0]);

  let lastTest = tests.find(
    (test) =>
      dayjs(test.timestamp).format("DD MMM YYYY HH:MM A") ===
      dayjs(Math.max(...tests.map((e) => new Date(e.timestamp)))).format(
        "DD MMM YYYY HH:MM A"
      )
  );

  const graphData = tests
    ?.map((test, index) =>
      venues.map((venue) => ({
        x: dayjs(test.timestamp).format("DD MMM YYYY HH:MM A"),
        y: test[venue][selectDevice.value],
      }))
    )
    .flat();
  console.log(graphData);

  return (
    <div className="container mb-2">
      {/* select device  */}
      <h6>Select a device</h6>
      <Select
        className="w-25"
        defaultValue={selectDevice}
        onChange={setSelectDevice}
        options={deviceOptions}
      />

      <h6 className="text-center">
        Last test : {dayjs(lastTest?.timestamp).format("DD MMM YYYY HH:MM A")}
      </h6>

      <div className="row">
        {venues.map((venue) => (
          <div className="col-md-2 mx-auto">
            <CircularProgressbar
              value={lastTest[venue][selectDevice.value]}
              text={`${lastTest[venue][selectDevice.value]}%`}
              className="text-success"
            />
            <p className="text-capitalize lead text-center">{venue}</p>
          </div>
        ))}
      </div>

      <h5 className="text-center">Graph of all venus in one</h5>
      {/* graph  */}
          <LineChart/>
      <br />
      <h6>Select a Venue</h6>
      <Select
        className="w-25"
        defaultValue={selectVenue}
        onChange={setSelectVenue}
        options={venueOptions}
      />

      <br />
      <h6>Select a device</h6>
      <Select
        className="w-25"
        defaultValue={selectDevice}
        onChange={setSelectDevice}
        options={deviceOptions}
      />
    </div>
  );
};

export default Home;
