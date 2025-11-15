import { useEffect, useState } from "react";

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setHistoryData(stored.reverse());
  }, []);

  const radius = 115;
  const center = 165;
  const weight = 40;
  const fullCircle = 2 * Math.PI * radius;

  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <section className="ml-[22%] mr-8 mb-4">
        <h2 className="text-[#133970] text-xl font-semibold mb-6">Your Analysis History</h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {historyData.length === 0 ? (
            <p className="text-gray-500">No previous analyses found.</p>
          ) : (
            historyData.map((entry, index) => {
              const bluePercent = entry.overallScore;
              const redPercent = 100 - bluePercent;
              const showRed = redPercent > 0;
              const blueOffset = (1 - bluePercent / 100) * fullCircle;
              const redOffset = (1 - (bluePercent + redPercent) / 100) * fullCircle;

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-xl p-4 shadow-md"
                >
                  <div className="flex justify-center items-center relative">
                    <svg
                      viewBox="-20 -8 350 345"
                      className="w-[220px] h-auto rotate-[-90deg]"
                    >
                      <circle
                        stroke="#ddd"
                        strokeWidth={weight}
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                      />
                      {showRed && (
                        <circle
                          stroke="#e74c3c"
                          strokeWidth={weight}
                          fill="transparent"
                          r={radius}
                          cx={center}
                          cy={center}
                          strokeDasharray={fullCircle}
                          strokeDashoffset={redOffset}
                        />
                      )}
                      <circle
                        stroke="#3b7ce9"
                        strokeWidth={weight}
                        fill="transparent"
                        r={radius}
                        cx={center}
                        cy={center}
                        strokeDasharray={fullCircle}
                        strokeDashoffset={blueOffset}
                      />
                    </svg>
                    <div className="absolute top-[45%] text-center text-[#133970] text-sm">
                      <p>
                        <span className="font-bold">{bluePercent}%</span> fit
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-[#333]">
                    <p className="font-semibold mb-1">Job Description:</p>
                    <p className="italic text-xs max-h-[100px] overflow-auto">
                      {entry.jobDescription}
                    </p>
                    <p className="mt-2 text-gray-400 text-[11px]">
                      Submitted on:{" "}
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default History;
