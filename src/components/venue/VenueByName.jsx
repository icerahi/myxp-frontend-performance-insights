import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

const VenueByName = () => {
  const { venue: venueName } = useParams();
 

  const [venue, setVenue] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://gevme-virtual-performance-insights.s3.ap-southeast-1.amazonaws.com/${venueName}/performance.json`
      );
      setVenue(res.data);
    };
    getData();
  }, [venueName]);
  return (
    <div className="container">
      <h2>Venue: {venueName}</h2>
      <p>Created: {dayjs(venue?.createdAt).format("DD MMM YYYY HH:MM A")}</p>

      <p>
        History:
        {venue?.history.map((date, index) => (
          <Link key={index} to={`/venue/${venueName}/${date}`}>
            {" "}
            {dayjs(date).format("DD MMM YYYY HH:MM A")}
          </Link>
        ))}{" "}
      </p>

      <div className="row text-center">
        <div className="col-md-6">
          <p>
            <strong>Desktop</strong> -Overall Score:{" "}
            {venue?.desktop?.overallScore} | Page Count:
            {venue?.desktop?.pageCount}
          </p>
          <hr />

          <div className="row row-cols-1 row-cols-md-2 g-4">
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
          </div>
        </div>

        <div className="col-md-6">

<p>
  <strong>Mobile</strong> -Overall Score: {venue?.mobile?.overallScore} | 
  Page Count: {venue?.mobile?.pageCount}
</p>
<hr />

<div className="row row-cols-1 row-cols-md-2 g-4">
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
    <span className="lead">{venue?.mobile?.["speed-index"]?.value}</span>
  </div>

  <div className="col">
    <p>Interactive</p>
    <span className="lead">{venue?.mobile?.["interactive"]?.value} </span>
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
</div>

        
      
      </div>
    </div>
    </div>
  );
};

export default VenueByName;
