import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineGraphOne({
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
        maintainAspectRatio: false,
        resizeDelay: 0,
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
              font: { size: window.innerWidth < 640 ? 9 : 11 },
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
            },
            grid: { display: false },
            border: { display: false },
          },
        },
      }
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
      <div className="relative w-full h-50 sm:h-45">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default LineGraphOne;