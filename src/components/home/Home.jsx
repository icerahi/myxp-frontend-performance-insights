import React, { useEffect } from "react";
import useStateData from "../../hooks/useStateData";
import Select from "react-select";
import { useState } from "react";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import LineChart from "../charts/LineChart";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import shareIcon from "../../assets/share.svg";
import useClipboard from "react-hook-clipboard";
import { domain } from "../../.env.js";
import { getColor } from "../../utils/utils";
import VenuesScore from "./VenuesScore";
import PerformanceMetrics from "./PerformanceMetrics";
import Report from "./Report";

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
  const [clipboard, copyToClipboard] = useClipboard();

  // const venueOptions = venues?.map((venue) => ({ value: venue, label: venue }));

  let livePageOptions = livePages?.map((livePage) => ({
    value: livePage.split("/")[0],
    label: livePage.split("/")[0],
  }));
  const timestampOptions = timestampsData?.map((timestamp) => ({
    value: timestamp.timestamp,
    label: dayjs(timestamp.timestamp).format("DD MMM YYYY HH:MM A"),
  }));

  //select handlers
  const [selectDevice, setSelectDevice] = useState(
    () =>
      deviceOptions.find(
        (device) => device.value === searchParams.get("device")
      ) || deviceOptions[0]
  );
  const [selectVenue, setSelectVenue] = useState(
    () =>
      venueOptions.find((venue) => venue.value === searchParams.get("venue")) ||
      venueOptions[0]
  );
  const [selectLivePage, setSelectLivePage] = useState(() =>
    livePageOptions.find(
      (livepage) =>
        livepage.value === searchParams.get("livepage") || livePageOptions[0]
    )
  );
  const [selectMatrix, setSelectMatrix] = useState(
    () =>
      matricsOptions.find(
        (matrix) => matrix.value === searchParams.get("matrix")
      ) || matricsOptions[0]
  );
  const [selectTimestamp, setSelectTimestamp] = useState(
    () =>
      timestampOptions.find(
        (timestamp) => timestamp.value === searchParams.get("timestamp")
      ) || timestampOptions[0]
  );

  let lastTest = tests.find(
    (test) =>
      dayjs(test.timestamp).format("DD MMM YYYY HH:MM A") ===
      dayjs(Math.max(...tests.map((e) => new Date(e.timestamp)))).format(
        "DD MMM YYYY HH:MM A"
      )
  );

  const colors = ["red", "yellow", "blue", "orange", "green"];

  const scoreGraphData = {
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

  const matrixGraphData = {
    labels:
      timestampsData.length !== 0
        ? timestampsData.map((timestamp) =>
            dayjs(timestamp.timestamp).format("DD MMM YYYY HH:MM A")
          )
        : [],
    datasets: [
      {
        label: selectMatrix?.label + " : ms",
        data:
          timestampsData.length !== 0
            ? timestampsData.map(
                (data) => data[selectMatrix?.value]?.value.split("ms")[0]
              )
            : [],
        borderColor: colors[0],
        backgroundColor: colors[0],
        yAxisID: "y",
      },
    ],
  };

  const [venueData, setVenueData] = useState({});

  useEffect(() => {
    const getVenueData = async () => {
      setLoading(true);
      const res1 = await axios.get(
        `${domain}/${selectVenue?.value}/performance.json`
      );
      setVenueData(res1.data);

      const timeStamps = [];
      res1?.data?.history?.map((timestamp) =>
        axios
          .get(
            `${domain}/${selectVenue?.value}/${timestamp}/${selectDevice?.value}.json`
          )
          .then((res) => {
            timeStamps.push(res.data);
            setLivePages(res.data?.paths);
          })
      );

      setTimestampsData(timeStamps);
      setLoading(false);
    };
    getVenueData();
  }, [selectVenue, selectDevice, selectMatrix]);

  let clipboardValue = `${window.location.origin}/?device=${
    selectDevice?.value || ""
  }&venue=${selectVenue?.value || ""}&matrix=${
    selectMatrix?.value || ""
  }&livepage=${selectLivePage?.value || ""}&timestamp=${
    selectTimestamp?.value || ""
  }`;

  return (
    <div className="container mb-2">
      {/* share button  */}
      <button
        onClick={() => copyToClipboard(clipboardValue)}
        title={`Copy URL:${clipboardValue}`}
        className="copyto-clipboard border-0 bg-light"
      >
        <img width={50} src={shareIcon} alt="" />
      </button>

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
      <VenuesScore
        venues={venues}
        lastTest={lastTest}
        selectDevice={selectDevice}
      />

      <div className="my-5">
        <h5 className="text-center">Graph of all venus in one</h5>
        {/* graph  */}
        <LineChart data={scoreGraphData} />
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
            className="w-25 p-4 mx-auto"
            background={true}
            styles={buildStyles({
              ...getColor(venueData[selectDevice.value]?.overallScore),
            })}
          />
        </div>
        <p className="fw-bold text-center lead">Over all performance score</p>
        <PerformanceMetrics loading={loading} venueData={venueData} />
      </div>
      {/* indivisual venue information end  */}

      {/* live pages  */}

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
        <h5 className="text-center">Graph of Metrics vs Timestamp</h5>

        <LineChart data={matrixGraphData} matrix={true} />
      </div>

      <>
        <div className="my-2">
          <h6>Select a live page</h6>
          <Select
            className="w-50"
            defaultValue={selectLivePage}
            onChange={setSelectLivePage}
            options={livePageOptions}
          />
        </div>
        {/* select timestamp for genarate report  */}
        <div className="my-2">
          <h6>Select a Timestamp for detailed report</h6>
          <Select
            className="w-50"
            defaultValue={selectTimestamp}
            onChange={setSelectTimestamp}
            options={timestampOptions}
          />
        </div>
        {/* detailed report */}
        <Report
          selectDevice={selectDevice}
          selectVenue={selectVenue}
          selectLivePage={selectLivePage}
          selectTimestamp={selectTimestamp}
        />
      </>
    </div>
  );
};

export default Home;
