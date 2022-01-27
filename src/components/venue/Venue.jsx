import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Venue = () => {
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
      <h2>this is Venue: {venueName}</h2>
      <p>Created: {new Date(venue?.createdAt).toDateString()}</p>
      <p>History: {venue?.history}</p>

     <div className="row text-center">
     <div className="col-md-6">
        <p>
          <strong>Desktop</strong> -Overall Score:{" "}
          {venue?.desktop?.overallScore} - Page Count:{" "}
          {venue?.desktop?.pageCount}
        </p>
        <hr />

        <p className="d-flex">
         <strong> First Contentful Paint:</strong> <br />
          total: {venue?.desktop["first-contentful-paint"]?.total} <br />
          average: {venue?.desktop["first-contentful-paint"]?.average} <br />
          value: {venue?.desktop["first-contentful-paint"]?.value} <br />
        </p>
        <p className="d-flex">
          <strong>largest contentful paint:</strong> <br />
          total:{venue?.desktop["largest-contentful-paint"]?.total} <br />
          average:{venue?.desktop["largest-contentful-paint"]?.average} <br />
          value:{venue?.desktop["largest-contentful-paint"]?.value} <br />
        </p>
        <p className="d-flex">
          <strong>Speed Index:</strong> <br />
          total:{venue?.desktop["speed-index"]?.total} <br />
          average:{venue?.desktop["speed-index"]?.average} <br />
          value:{venue?.desktop["speed-index"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Interactive:</strong> <br />
          total:{venue?.desktop["interactive"]?.total} <br />
          average:{venue?.desktop["interactive"]?.average} <br />
          value:{venue?.desktop["interactive"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Total blocking time:</strong> <br />
          total:{venue?.desktop["total-blocking-time"]?.total} <br />
          average:{venue?.desktop["total-blocking-time"]?.average} <br />
          value:{venue?.desktop["total-blocking-time"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Cumulative layout shift:</strong> <br />
          total:{venue?.desktop["cumulative-layout-shift"]?.total} <br />
          average:{venue?.desktop["cumulative-layout-shift"]?.average} <br />
          value:{venue?.desktop["cumulative-layout-shift"]?.value} <br />
        </p>
      </div>

      <br />
      <div className="col-md-6">
      <p><strong>Mobile</strong> -Overall Score: {venue?.mobile?.overallScore} - 
    Page Count: {venue?.mobile?.pageCount}</p>
        <hr />
    
        <p className="d-flex">
          <strong>First Contentful Paint:</strong> <br />
          total:{venue?.mobile["first-contentful-paint"]?.total} <br />
          average:{venue?.mobile["first-contentful-paint"]?.average} <br />
          value:{venue?.mobile["first-contentful-paint"]?.value} <br />
        </p>
        <p className="d-flex">
          <strong>largest contentful paint: </strong><br />
          total:{venue?.mobile["largest-contentful-paint"]?.total} <br />
          average:{venue?.mobile["largest-contentful-paint"]?.average} <br />
          value:{venue?.mobile["largest-contentful-paint"]?.value} <br />
        </p>
        <p className="d-flex">
          <strong>Speed Index:</strong> <br />
          total:{venue?.mobile["speed-index"]?.total} <br />
          average:{venue?.mobile["speed-index"]?.average} <br />
          value:{venue?.mobile["speed-index"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Interactive:</strong> <br />
          total:{venue?.mobile["interactive"]?.total} <br />
          average:{venue?.mobile["interactive"]?.average} <br />
          value:{venue?.mobile["interactive"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Total blocking time:</strong> <br />
          total:{venue?.mobile["total-blocking-time"]?.total} <br />
          average:{venue?.mobile["total-blocking-time"]?.average} <br />
          value:{venue?.mobile["total-blocking-time"]?.value} <br />
        </p>

        <p className="d-flex">
          <strong>Cumulative layout shift:</strong> <br />
          total:{venue?.mobile["cumulative-layout-shift"]?.total} <br />
          average:{venue?.mobile["cumulative-layout-shift"]?.average} <br />
          value:{venue?.mobile["cumulative-layout-shift"]?.value} <br />
        </p>
      </div>
     </div>
    </div>
  );
};

export default Venue;
