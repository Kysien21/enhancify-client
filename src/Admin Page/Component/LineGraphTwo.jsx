import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineGraphTwo({
  title = "System Activity Graph",
  labels = ["JAN", "FEB", "MAR", "APRIL", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"],
  data = [20, 80, 140, 180, 200, 240, 220, 240, 270, 330, 310, 170],
  borderColor = "#4a4a4a",
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Dynamic Y-Axis
    const maxValue = Math.max(...data, 0);
    const yAxisMax = maxValue > 0 ? Math.ceil(maxValue * 1.2) : 400;
    const stepSize = Math.ceil(yAxisMax / 4);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tokens",
            data: data,
            borderColor: borderColor,
            backgroundColor: "rgba(74, 74, 74, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 2,
            pointHoverRadius: 5,
            pointBackgroundColor: borderColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K tokens`;
                }
                return `${value} tokens`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: yAxisMax,
            ticks: {
              stepSize: stepSize,
              color: "#4a4a4a",
              font: { size: window.innerWidth < 640 ? 9 : 11 },
              callback: function (value) {
                return value >= 1000 ? (value / 1000).toFixed(0) + "K" : value;
              },
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
              font: { size: window.innerWidth < 640 ? 8 : 10 },
              maxRotation: 45,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: window.innerWidth < 640 ? 8 : 15,
            },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data, borderColor]);

  return (
    <div className="bg-[#DCDCDC] p-3 sm:p-4 md:p-6 rounded-lg w-full">
      <h2 className="text-[#5b7fa6] mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base md:text-lg lg:text-xl font-normal">
        {title}
      </h2>

      {/* Changed h-50 → h-52 (valid Tailwind height) */}
      <div className="relative w-full h-52 sm:h-56 md:h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default LineGraphTwo;
