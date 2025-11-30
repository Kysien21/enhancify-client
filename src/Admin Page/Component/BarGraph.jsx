import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarGraph = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const data = {
      labels: ["CIT", "CBA", "CTE", "CAS", "CCJE", ],
      datasets: [
        {
          label: "Department Data",
          data: [290, 450, 410, 580, 530],
          backgroundColor: "#3b5998",
          borderColor: "#3b5998",
          borderWidth: 0,
          borderRadius: 0,
          barThickness: 30,
        },
      ],
    };

    const config = {
      type: "bar",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 10,
            displayColors: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 600,
            ticks: { stepSize: 100, color: "#4a4a4a", font: { size: 11 } },
            grid: { color: "#9a9a9a", lineWidth: 1 },
            border: { display: false },
          },
          x: {
            ticks: { color: "#4a4a4a", font: { size: 11, weight: "600" } },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    };

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, []);

  return (
    <div className="bg-[#DCDCDC] p-8 rounded-lg w-full h-[300px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarGraph;
