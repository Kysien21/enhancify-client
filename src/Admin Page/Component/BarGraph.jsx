import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarGraph = ({ title, labels, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // ✅ Use props instead of hardcoded data
    const chartData = {
      labels: labels || ["CIT", "CBA", "CTE", "CAS", "CCJE"],
      datasets: [
        {
          label: "Department Data",
          data: data || [0, 0, 0, 0, 0], // ✅ Use data prop
          backgroundColor: "#3b5998",
          borderColor: "#3b5998",
          borderWidth: 0,
          borderRadius: 0,
          barThickness: 30,
        },
      ],
    };

    // ✅ Calculate dynamic max value
    const maxValue = Math.max(...(data || [0]));
    const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.2) : 10;

    const config = {
      type: "bar",
      data: chartData,
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
            max: yAxisMax, // ✅ Dynamic max
            ticks: { 
              stepSize: Math.ceil(yAxisMax / 5), // ✅ Dynamic step size
              color: "#4a4a4a", 
              font: { size: 11 },
              precision: 0 // ✅ No decimals for user counts
            },
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

    // Destroy existing chart before creating new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, config);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [labels, data]); // ✅ Re-render when data changes

  return (
    <div className="bg-[#DCDCDC] p-8 rounded-lg w-full h-[300px]">
      {title && (
        <h3 className="text-center text-lg font-semibold text-[#1E3A8A] mb-4">
          {title}
        </h3>
      )}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarGraph;