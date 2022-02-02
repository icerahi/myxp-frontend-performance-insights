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
import { useParams, useSearchParams } from "react-router-dom";

const Home = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { tests, venues } = useStateData();

  const deviceOptions = [
    { value: "desktop", label: "Desktop" },
    { value: "mobile", label: "Mobile" },
  ];

  const venueOptions = venues?.map((venue) => ({ value: venue, label: venue }));

  const [selectDevice, setSelectDevice] = useState(deviceOptions[0]);
  const [selectVenue, setSelectVenue] = useState(venueOptions[0]);

  const deviceOnChangeHandler = (event) => {
    setSelectDevice(event);
    setSearchParams({ device: event.value });
  };

  const venueOnChangeHandler = (event) => {
    setSelectVenue(event);
    setSearchParams({ venue: event.value });
  };

  let lastTest = tests.find(
    (test) =>
      dayjs(test.timestamp).format("DD MMM YYYY HH:MM A") ===
      dayjs(Math.max(...tests.map((e) => new Date(e.timestamp)))).format(
        "DD MMM YYYY HH:MM A"
      )
  );

  const colors = ["red", "yellow", "blue", "orange", "green"];

  const graphData = {
    labels: tests.map((test) =>
      dayjs(test.timestamp).format("DD MMM YYYY HH:MM A")
    ),
    datasets: venues.map((venue, index) => ({
      label: venue.toUpperCase(),
      data: tests.map((test) => test[venue][selectDevice.value]),
      borderColor: colors[index],
      backgroundColor: colors[index],
      yAxisID: "y",
    })),
  };

  return (
    <div className="container mb-2">
      {/* select device  */}
      <h6>Select a device</h6>
      <Select
        className="w-25"
        defaultValue={selectDevice}
        onChange={deviceOnChangeHandler}
        options={deviceOptions}
      />

      <h6 className="text-center">
        Last test : {dayjs(lastTest?.timestamp).format("DD MMM YYYY HH:MM A")}
      </h6>

      <div className="row">
        {venues.map((venue,index) => (
          <div key={index} className="col-md-2 mx-auto">
            <CircularProgressbar
              value={lastTest[venue][selectDevice.value]}
              text={`${lastTest[venue][selectDevice.value]}%`}
              className="text-success"
            />
            <p className="text-capitalize lead text-center">{venue}</p>
          </div>
        ))}
      </div>

      <div className="my-5">
        <h5 className="text-center">Graph of all venus in one</h5>
        {/* graph  */}
        <LineChart data={graphData} />
      </div>

      <h6>Select a Venue</h6>
      <Select
        className="w-25"
        defaultValue={selectVenue}
        onChange={venueOnChangeHandler}
        options={venueOptions}
      />
    </div>
  );
};

export default Home;
