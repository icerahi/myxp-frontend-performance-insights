import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

const VenueByNameTimeStamp = () => {
  const { venue: venueName, timestamp } = useParams();

  const [desktop, setDesktop] = useState(null);
  const [mobile, setMobile] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res1 = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/${timestamp}/desktop.json`
      );
      setDesktop(res1.data);

      const res2 = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/${timestamp}/mobile.json`
      );
      setMobile(res2.data);
    };
    getData();
  }, [venueName, timestamp]);
  return (
    <div className="container">
      <h2> Venue: {venueName}</h2>
 
      <div className="row text-center">
        <div className="col-md-6">
        <small>Created: {dayjs(desktop?.timestamp).format("DD MMM YYYY HH:MM A")}</small>
          <p>
            <strong>Desktop</strong> -Overall Score: {desktop?.overallScore} |
            Page Count: {desktop?.pageCount}
          </p>
          <hr />

          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <p> First Contentful Paint</p>
              <span className="lead">
                {" "}
                {desktop?.["first-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Largest Contentful paint</p>
              <span className="lead">
                {" "}
                {desktop?.["largest-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Speed Index</p>
              <span className="lead">{desktop?.["speed-index"]?.value}</span>
            </div>

            <div className="col">
              <p>Interactive</p>
              <span className="lead">{desktop?.["interactive"]?.value} </span>
              <br />
            </div>

            <div className="col">
              <p>Total Blocking Time</p>
              <span className="lead">
                {" "}
                {desktop?.["total-blocking-time"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Cumulative Layout Shift</p>
              <span className="lead">
                {desktop?.["cumulative-layout-shift"]?.value}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
        <small>Created: {dayjs(mobile?.timestamp).format("DD MMM YYYY HH:MM A")}</small>

          <p>
            <strong>Mobile</strong> -Overall Score: {mobile?.overallScore} | 
            Page Count: {mobile?.pageCount}
          </p>
          <hr />

          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <p> First Contentful Paint</p>
              <span className="lead">
                {" "}
                {mobile?.["first-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Largest Contentful paint</p>
              <span className="lead">
                {" "}
                {mobile?.["largest-contentful-paint"]?.value}
              </span>
            </div>
            <div className="col">
              <p>Speed Index</p>
              <span className="lead">{mobile?.["speed-index"]?.value}</span>
            </div>

            <div className="col">
              <p>Interactive</p>
              <span className="lead">{mobile?.["interactive"]?.value} </span>
              <br />
            </div>

            <div className="col">
              <p>Total Blocking Time</p>
              <span className="lead">
                {" "}
                {mobile?.["total-blocking-time"]?.value}
              </span>
            </div>

            <div className="col">
              <p>Cumulative Layout Shift</p>
              <span className="lead">
                {mobile?.["cumulative-layout-shift"]?.value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueByNameTimeStamp;
