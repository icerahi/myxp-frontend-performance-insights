import React from "react";
import Spinner from "../spinner/Spinner";

const PerformanceMetrics = ({ loading, venueData }) => {
  return (
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
  );
};

export default PerformanceMetrics;
