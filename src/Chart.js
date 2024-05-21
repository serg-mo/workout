import React, { useState } from "react";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const colors = ["#0000FF", "#1E90FF", "#4169E1", "#4682B4", "#5F9EA0"];

// TODO: consider bubble chart, where the size of the bubble is the group size
export default function Chart({ workouts, exercise }) {
  const options = {
    responsive: true,
    plugins: {
      legend: true,
    },
    parsing: {
      xAxisKey: "weight",
      yAxisKey: "reps",
    },
    scales: {
      x: {
        position: "bottom",
        title: {
          display: true,
          text: "Weight",
        },
      },
      y: {
        position: "left",
        title: {
          display: true,
          text: "Reps",
        },
      },
    },
  };

  const datasets = Object.entries(workouts)
    .map(([label, exercises], index) => {
      const data = exercises[exercise];

      return {
        label, // date
        data, // [{ weight, reps, timestamp }]
        pointBackgroundColor: colors[index],
        pointRadius: 8,
        backgroundColor: colors[index],
      };
    })
    .filter(({ data }) => data && data.length > 0);

  return <Scatter options={options} data={{ datasets }} />;
}
