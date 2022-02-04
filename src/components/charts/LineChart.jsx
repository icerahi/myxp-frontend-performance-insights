import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

const LineChart = ({ data, matrix }) => {
  return (
    <Line
      data={data}
      options={{
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: false,
            text: "Graph of Each Venues Overall Score",
          },
          
        },

        scales: {
          y: {
            type: "linear",
            display: true,
            position: "right",
          },
          y1: {
            type: "linear",
            display: true,
            position: "left",

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      }}
    />
  );
};

export default LineChart;
