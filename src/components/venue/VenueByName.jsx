import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Bar, Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";
import { Chart  } from "chart.js";

Chart.defaults.global={
  showTooltips:false
}

const VenueByName = () => {
  const { venue: venueName } = useParams();

  const [desktopChartData, setDesktopChartData] = useState({});

  const [venue, setVenue] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/performance.json`
      );
      setVenue(res.data);

      const desktop = res?.data?.desktop;
    };
    getData();
  }, [venueName]);

  console.log(desktopChartData);
  return (
    <div className="container">
      <h2>Venue: {venueName}</h2>
      <p>Created: {dayjs(venue?.createdAt).format("DD MMM YYYY HH:MM A")}</p>

      <p>
        History:
        {venue?.history?.map((date, index) => (
          <Link key={index} to={`/venue/${venueName}/${date}`}>
            {" "}
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

          <Bar
            data={{
              labels: [
                "First Contentful Paint",
                "Largest Contentful Paint",
                "Speed Index",
                "Interactive",
                "Total Blocking Time",
                "Cumulative Layout Shift",
              ],
              datasets: [
                {
                  label: "Performance Metrics (ms)",
                  data: [
                    {x:"2019-01-03",y:15}
                  ],
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
            options={{
              plugins: {  // 'legend' now within object 'plugins {}'
                // legend: {
                //   labels: {
                //     color: "blue",  // not 'fontColor:' anymore
                //     backgroundColor:"black",
                //     // fontSize: 18  // not 'fontSize:' anymore
                //     font: {
                //       size: 18 // 'size' now within object 'font {}'
                //     }
                //   }
                // },
                // tooltip:{
                //   callbacks:{
                //     afterLabel:(context)=>{
                //       return context.dataset.label+" ms"
                //     }
                //   }
                // }
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
              legend: {
                labels: {
                  fontSize: 100,
                  fontColor: "black",
                },
              },
            }}
          />

          {/* text data display start  */}

          {/*    <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <p> First Contentful Paint</p>
              <span className="lead">
                {" "}
                {venue?.desktop["first-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Largest Contentful paint</p>
              <span className="lead">
                {" "}
                {venue?.desktop["largest-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Speed Index</p>
              <span className="lead">
                {venue?.desktop["speed-index"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Interactive</p>
              <span className="lead">
                {venue?.desktop["interactive"]?.value}{" "}
              </span>
              <br />
            </div>

            <div className="col">
              <p>Total Blocking Time</p>
              <span className="lead">
                {" "}
                {venue?.desktop["total-blocking-time"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Cumulative Layout Shift</p>
              <span className="lead">
                {venue?.desktop["cumulative-layout-shift"]?.value}
              </span>
            </div>
          </div> */}
          {/* text data display end  */}
        </div>

        <div className="col-md-8">
          <p>
            <strong>Mobile</strong> -Overall Score:{" "}
            {venue?.mobile?.overallScore} | Page Count:{" "}
            {venue?.mobile?.pageCount}
          </p>
          <hr />

          <Line
            data={{
              labels: [
                "First Contentful Paint",
                "Largest Contentful Paint",
                "Speed Index",
                "Interactive",
                "Total Blocking Time",
                "Cumulative Layout Shift",
              ],
              datasets: [
                {
                  label: "Performance Metrics (ms)",
                  data: [
                    venue?.mobile["first-contentful-paint"]?.value.split(
                      "ms"
                    )[0],
                    venue?.mobile["largest-contentful-paint"]?.value.split(
                      "ms"
                    )[0],
                    venue?.mobile["speed-index"]?.value.split("ms")[0],
                    venue?.mobile["interactive"]?.value.split("ms")[0],
                    venue?.mobile["total-blocking-time"]?.value.split("ms")[0],
                    venue?.mobile["cumulative-layout-shift"]?.value.split(
                      "ms"
                    )[0],
                  ],
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

          {/* <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <p> First Contentful Paint</p>
              <span className="lead">
                {" "}
                {venue?.mobile?.["first-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Largest Contentful paint</p>
              <span className="lead">
                {" "}
                {venue?.mobile?.["largest-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Speed Index</p>
              <span className="lead">
                {venue?.mobile?.["speed-index"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Interactive</p>
              <span className="lead">
                {venue?.mobile?.["interactive"]?.value}{" "}
              </span>
              <br />
            </div>

            <div className="col">
              <p>Total Blocking Time</p>
              <span className="lead">
                {" "}
                {venue?.mobile?.["total-blocking-time"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Cumulative Layout Shift</p>
              <span className="lead">
                {venue?.mobile?.["cumulative-layout-shift"]?.value}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VenueByName;
