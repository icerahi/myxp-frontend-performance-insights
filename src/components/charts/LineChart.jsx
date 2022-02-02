import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Utils } from "chart.js";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineChart = () => {
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
  const labels = MONTHS;
  const data = {
    labels: ["january","february"],
    datasets: [
      {
        label: "Genesis",
        data: [20,30],
        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        yAxisID: "y",
      },
      {
        label: "Galary",
        data: [7,10],
        // borderColor: Utils.CHART_COLORS.blue,
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: "y",
      },
      {
        label: "Mbs",
        data: [5,20],
        // borderColor: Utils.CHART_COLORS.blue,
        // backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        yAxisID: "y",
      },
    ],
  };
  return <Line 
  data={data}
  options={{
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis'
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'right',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'left',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }
  }}
    />;
};

export default LineChart;
