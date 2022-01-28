import React, { useEffect, useState } from "react";
import { Bar, Doughnut,Line } from "react-chartjs-2";
import { Chart as Chartjs } from "chart.js/auto";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor:[
//           "red",
//           "blue",
//           "yellow",
//           "green",
//           "purple",
//           "orange"
//       ],
//       borderColor:[
//         "red",
//         "blue",
//         "yellow",
//         "green",
//         "purple",
//         "orange"
//       ],
//       borderWidth:10
//     },
//   ],
// };
const BarChart = ({data}) => {
  return (
    <div className="container">
      <div >
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BarChart;
