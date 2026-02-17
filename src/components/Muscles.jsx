import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function Muscles() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch('/muscles.json')
      .then((res) => res.json())
      .then((data) => {
        const primaryCounts = {};
        const secondaryCounts = {};

        Object.values(data).forEach(({ primary, secondary }) => {
          primary.split(',').forEach((m) => {
            const muscle = m.trim();
            if (!muscle) return;
            primaryCounts[muscle] = (primaryCounts[muscle] || 0) + 1;
          });

          secondary.split(',').forEach((m) => {
            const muscle = m.trim();
            if (!muscle) return;
            secondaryCounts[muscle] = (secondaryCounts[muscle] || 0) + 1;
          });
        });

        const allMuscles = new Set([
          ...Object.keys(primaryCounts),
          ...Object.keys(secondaryCounts),
        ]);
        const labels = Array.from(allMuscles);

        const primaryData = labels.map((muscle) => primaryCounts[muscle] || 0);
        const secondaryData = labels.map((muscle) => secondaryCounts[muscle] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Primary',
              data: primaryData,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Secondary',
              data: secondaryData,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  if (!chartData) return <p className="text-center mt-4 text-gray-600">Loading chart...</p>;

  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: false,
        },
      },
      y: {
        stacked: true,
        title: {
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
}
