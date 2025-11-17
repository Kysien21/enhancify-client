import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineGraph({
  title = "System Activity Graph",
  labels = [
    "JAN",
    "FEB",
    "MAR",
    "APRIL",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ],
  data = [20, 80, 140, 180, 200, 240, 220, 240, 270, 330, 310, 170],
  borderColor = "#4a4a4a",
  width = 90,
  height = 20,
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Activity",
            data: data,
            borderColor: borderColor,
            backgroundColor: "transparent",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 400,
            ticks: {
              stepSize: 100,
              color: "#4a4a4a",
              font: { size: 11 },
            },
            grid: {
              color: "#9a9a9a",
              lineWidth: 1,
            },
            border: { display: false },
          },
          x: {
            ticks: {
              color: "#4a4a4a",
              font: { size: 10 },
            },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });
  }, [labels, data, borderColor]);

  return (
    <div className="bg-[#DCDCDC] p-7 rounded-lg">
      <h2 className="text-[#5b7fa6] mb-5 text-lg font-normal">{title}</h2>
      <canvas ref={chartRef} width={width} height={height}></canvas>
    </div>
  );
}

export default LineGraph;
