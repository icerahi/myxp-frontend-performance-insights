import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React, { useEffect } from "react";
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
import axios from "axios";
import Spinner from "../spinner/Spinner";

const deviceOptions = [
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];

const venueOptions = [
  { value: "genesis", label: "Genesis" },
  { value: "gallery", label: "Gallery" },
  { value: "mbs", label: "Mbs" },
  { value: "redrock", label: "Redrock" },
  { value: "bunker", label: "Bunker" },
];
const matricsOptions = [
  { value: "first-contentful-paint", label: "First Contentful Paint" },
  { value: "largest-contentful-paint", label: "Largest Contentful Paint" },
  { value: "speed-index", label: "Speed Index" },
  { value: "interactive", label: "Interactive" },
  { value: "total-blocking-time", label: "Total Blocking Time" },
  { value: "cumulative-layout-shift", label: "Cumulative Layout Shift" },
];

const Home = () => {
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const { tests, venues } = useStateData();
  const [livePages, setLivePages] = useState([]);
  const [timestampsData, setTimestampsData] = useState([]);

  // const venueOptions = venues?.map((venue) => ({ value: venue, label: venue }));

  const livePageOptions = livePages?.map((livePage) => ({
    value: livePage,
    label: livePage,
  }));

  const [selectDevice, setSelectDevice] = useState(deviceOptions[0]);
  const [selectVenue, setSelectVenue] = useState(venueOptions[0]);
  const [selectLivePage, setSelectLivePage] = useState(livePageOptions[0]);
  const [selectMatrix, setSelectMatrix] = useState(matricsOptions[0]);

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

  const matricsGraphData = {
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

  const [venueData, setVenueData] = useState({});
  useEffect(() => {
    const getVenueData = async () => {
      setLoading(true);
      const res1 = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${selectVenue?.value}/performance.json`
      );
      setVenueData(res1.data);
      setLoading(false);

      res1?.data?.history?.map((timestamp) =>
        axios
          .get(
            `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${selectVenue?.value}/${timestamp}/desktop.json`
          )
          .then((res) => setTimestampsData((t) => [...t, res.data]))
      );

      //getting latest timestamp venue data and live pages
      const res3 = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${selectVenue?.value}/${res1.data?.createdAt}/${selectDevice.value}.json`
      );
      setLivePages(res3.data?.paths);
    };
    getVenueData();
  }, [selectVenue, selectDevice]);

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
        {venues.map((venue, index) => (
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

      {/* indivisual venue information */}
      <div>
        <h6>Select a Venue</h6>
        <Select
          className="w-25"
          defaultValue={selectVenue}
          onChange={setSelectVenue}
          options={venueOptions}
        />
        {/* forall score of selected venue  */}
        <div className="bg-white text-center my-3">
          <CircularProgressbar
            value={venueData[selectDevice.value]?.overallScore}
            text={`${venueData[selectDevice.value]?.overallScore}%`}
            className="text-success w-25 p-4 shadow-3 mx-auto"
          />
        </div>
        <p className="fw-bold text-center lead">Over all performance score</p>
        <div className="bg-white px-5 py-3">
          <p className="fw-bold">Metrics</p>

          <div className="row text-center">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="col-md-6 border-top  justify-content-between">
                  <p className="lead">
                    First Contentful Paint <br />{" "}
                    <span className="lead fw-bold">
                      {venueData?.desktop["first-contentful-paint"]?.value}{" "}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 border-top   ">
                  <p className="lead">
                    Largest Contentful Paint <br />
                    <span className="lead fw-bold">
                      {venueData?.desktop["largest-contentful-paint"]?.value}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 border-top  ">
                  <p className="lead">
                    Speed Index <br />{" "}
                    <span className="lead fw-bold">
                      {venueData?.desktop["speed-index"]?.value}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 border-top  ">
                  <p className="lead">
                    Interactive <br />{" "}
                    <span className="lead fw-bold">
                      {venueData?.desktop["interactive"]?.value}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 border-top  ">
                  <p className="lead">
                    Total Blocking Time <br />{" "}
                    <span className="lead fw-bold">
                      {venueData?.desktop["total-blocking-time"]?.value}
                    </span>
                  </p>
                </div>

                <div className="col-md-6 border-top  ">
                  <p className="lead">
                    Cumulative Layout Shift <br />{" "}
                    <span className="lead fw-bold">
                      {venueData?.desktop["cumulative-layout-shift"]?.value}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* indivisual venue information end  */}

      {/* live pages  */}
      <div>
        <h6>Select a live page</h6>
        <Select
          className="w-50"
          defaultValue={selectLivePage}
          onChange={setSelectLivePage}
          options={livePageOptions}
        />
      </div>

      <div>
        <h6>Select a Matrix</h6>
        <Select
          className="w-50"
          defaultValue={selectMatrix}
          onChange={setSelectMatrix}
          options={matricsOptions}
        />
      </div>
      <div className="my-5">
        <h5 className="text-center">Graph of Matrics vs Timestamp</h5>
        {/* graph  */}
        <LineChart data={graphData} />
      </div>
    </div>
  );
};

export default Home;
