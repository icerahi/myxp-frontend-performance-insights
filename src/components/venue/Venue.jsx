import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams,useSearchParams} from "react-router-dom";
import dayjs from "dayjs";
import { Bar, Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { Chart } from "chart.js";

const Venue = () => {
  const { venue: venueName } = useParams();

  const [desktopChartData, setDesktopChartData] = useState({});

  const [venue, setVenue] = useState(null);
  const [results, setResult] = useState([]);
  let [searchParams,setSearchParams] = useSearchParams()
  console.log(searchParams.get('name'),searchParams.get('version'))
  
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/performance.json`
      );
      //   setVenue(res.data);

      res?.data?.history?.map((timestamp) => {
        axios
          .get(
            `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/${timestamp}/desktop.json`
          )
          .then((res) => setResult([...results, res.data]));
      });
    };
    getData();
  }, [venueName]);

  console.log(results);
  return (
    <div className="container">
      <h2>Venue: {venueName}</h2>
      <p>Created: </p>

      <p>
        History:
        {venue?.history?.map((date, index) => (
          <Link key={index} to={`/venue/${venueName}/${date}`}>
            {" "}
            Metrics Details:
            {dayjs(date).format("DD MMM YYYY HH:MM A")}
          </Link>
        ))}{" "}
      </p>

      <div className="row text-center justify-content-center gy-5">
        <div className="col-md-8">
          <p>
            <strong>Desktop</strong> -Overall Score:{" "}
            {venue?.desktop?.overallScore} | Page Count:{" "}
            {venue?.desktop?.pageCount}
          </p>
          <hr />

          <Line
            data={{
              labels: [],
              datasets: [
                {
                  label: "Overall Score: ",
                  data: results?.map(result => ({x:dayjs(result.timestamp).format("DD MMM YYYY HH:MM A"),y:result.overallScore})),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Venue;
